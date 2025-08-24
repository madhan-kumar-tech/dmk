import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiDescriptor } from '../types/api';
import { useAppStore } from '../store';
import { apiFetch } from '../services/client';

type Options = {
  initialPage?: number;
  initialLimit?: number;
  initialSearch?: string;

  form?: boolean;
  enabled?: boolean;
};

export function useGeneralApi<TData = any>(
  descriptor: ApiDescriptor<any>,
  opts: Options = {},
) {
  const begin = useAppStore(s => s.beginRequest);
  const end = useAppStore(s => s.endRequest);

  const hasPage = Object.prototype.hasOwnProperty.call(
    descriptor?.payload ?? {},
    'page',
  );
  const hasLimit = Object.prototype.hasOwnProperty.call(
    descriptor?.payload ?? {},
    'limit',
  );
  const hasSearch = Object.prototype.hasOwnProperty.call(
    descriptor?.payload ?? {},
    'searchTerm',
  );

  const [page, setPage] = useState<number>(
    hasPage
      ? descriptor.payload!.page ?? opts.initialPage ?? 1
      : opts.initialPage ?? 1,
  );
  const [limit, setLimit] = useState<number>(
    hasLimit
      ? descriptor.payload!.limit ?? opts.initialLimit ?? 10
      : opts.initialLimit ?? 10,
  );
  const [search, setSearch] = useState<string>(
    hasSearch
      ? descriptor.payload!.searchTerm ?? opts.initialSearch ?? ''
      : opts.initialSearch ?? '',
  );

  const effectiveDescriptor = useMemo(() => {
    const base = descriptor?.payload ?? {};
    const payload = {
      ...base,
      ...(hasPage ? { page } : {}),
      ...(hasLimit ? { limit } : {}),
      ...(hasSearch ? { searchTerm: search } : {}),
    };
    return { ...descriptor, payload };
  }, [descriptor, page, limit, search, hasPage, hasLimit, hasSearch]);

  const queryKey = useMemo(
    () => [
      'general',
      effectiveDescriptor.url,
      effectiveDescriptor.method,
      effectiveDescriptor.payload,
    ],
    [effectiveDescriptor],
  );

  const query = useQuery<TData>({
    queryKey,
    queryFn: async () => {
      begin();
      try {
        return await apiFetch<TData>(effectiveDescriptor, { form: opts.form });
      } finally {
        end();
      }
    },

    enabled: opts.enabled ?? true,
    retry: 1,
    staleTime: 10_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,

    ...(hasPage ? { page, setPage } : {}),
    ...(hasLimit ? { limit, setLimit } : {}),
    ...(hasSearch ? { search, setSearch } : {}),
  };
}
