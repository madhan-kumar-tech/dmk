import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '../store';
import { apiFetch } from '../services/client';
import { ApiUiType } from '../types/ui';

type HomeCardOption = {
  value: number;
  label: string;
  uiType: ApiUiType;
  api: {
    method: 'POST' | 'GET';
    url: string;
    payload?: any;
    uiType?: ApiUiType;
  };
};

type HomeSuccess = {
  gauge: {
    title: string;
    dataFilterValues: { label: string; value: number }[];
    total: number;
  };
  barChart: {
    title: string;
    dataFilterValues: { label: string; color: string[]; value: number }[];
    total: number;
  }[];
  options: HomeCardOption[];
};

type HomeData = HomeSuccess | null;

export function useHomeApi() {
  const begin = useAppStore(s => s.beginRequest);
  const end = useAppStore(s => s.endRequest);

  const query = useQuery<HomeData>({
    queryKey: ['home'],
    enabled: true,
    retry: (failureCount, error) => {
      if (failureCount < 3) {
        const errorMessage = (error as any)?.message || '';
        if (
          errorMessage.includes('Network request failed') ||
          errorMessage.includes('timeout') ||
          errorMessage.includes('No internet connection')
        ) {
          return true;
        }
      }
      return false;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),
    staleTime: 15000,
    gcTime: 300000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      begin();
      try {
        const resp = await apiFetch<HomeSuccess[] | HomeSuccess>(
          { method: 'POST', url: 'api/home.php' },
          { form: false },
        );

        const arr = resp as any;
        return Array.isArray(arr) ? arr[0] ?? null : arr ?? null;
      } catch (error) {
        throw error;
      } finally {
        end();
      }
    },
  });

  const gauge = useMemo(() => query.data?.gauge ?? null, [query.data]);
  const barChart = useMemo(() => query.data?.barChart ?? [], [query.data]);
  const options = useMemo(() => query.data?.options ?? [], [query.data]);

  return { ...query, gauge, barChart, options };
}
