import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiDescriptor } from '../../types/api';
import { apiFetch } from '../../services/client';

export type UseDescriptorOptions = {
  initialPage?: number;
  initialLimit?: number;
  searchTerm?: string;
};

export function useApiFromDescriptor<TData = any>(
  descriptor: ApiDescriptor<any>,
  opts: UseDescriptorOptions = {},
) {
  const [page, setPage] = useState<number>(
    descriptor.payload?.page ?? opts.initialPage ?? 1,
  );
  const [limit, setLimit] = useState<number>(
    descriptor.payload?.limit ?? opts.initialLimit ?? 10,
  );
  const [search, setSearch] = useState<string>(
    (descriptor.payload?.searchTerm as string) ?? opts.searchTerm ?? '',
  );

  const effectiveDescriptor = useMemo(() => {
    const basePayload = descriptor.payload ?? {};
    const withPagination = {
      ...basePayload,
      ...(basePayload.hasOwnProperty('page') ? { page } : {}),
      ...(basePayload.hasOwnProperty('limit') ? { limit } : {}),
      ...(basePayload.hasOwnProperty('searchTerm')
        ? { searchTerm: search }
        : {}),
    };

    return { ...descriptor, payload: withPagination };
  }, [descriptor, page, limit, search]);

  const queryKey = useMemo(
    () => [
      'descriptor',
      effectiveDescriptor.url,
      effectiveDescriptor.method,
      effectiveDescriptor.payload,
    ],
    [effectiveDescriptor],
  );

  const query = useQuery<TData>({
    queryKey,
    queryFn: () => apiFetch<TData>(effectiveDescriptor),
  });

  return {
    ...query,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
  };
}
