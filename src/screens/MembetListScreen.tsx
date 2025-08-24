import React, { useEffect, useMemo, useState } from 'react';
import { MemberListTemplate } from '../components/templates/MemberListTemplate';
import { useDMKNavigation, useDMKRoute } from '../hooks';
import { useGeneralApi } from '../hooks/useGeneralApi';
import { navigateByUiType } from '../navigation/navigateByUiType';
import { ApiUiType, UI_TO_SCREEN } from '../types/ui';
import { ApiStateHandler } from '../components/states/ApiStateHandler';
import type { MemberListResponse, MemberRow } from '../types';

const MembetListScreen: React.FC = () => {
  const { params } = useDMKRoute('MemberList');

  const descriptor = useMemo(() => {
    const base = params.descriptor ?? {};
    const payload = {
      ...(base.payload ?? {}),
      page: base.payload?.page ?? 1,
      limit: base.payload?.limit ?? 8,
    };
    return { ...base, payload };
  }, [params.descriptor]);

  const { data, error, refetch, isFetching, isLoading, page, setPage } =
    useGeneralApi<MemberListResponse>(descriptor);

  const [items, setItems] = useState<MemberRow[]>([]);
  const [title, setTitle] = useState<string>('');
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    if (!data) return;

    const incoming = Array.isArray(data.list) ? data.list : [];
    const total = (data as any).totalCount ?? (data as any).total ?? 0;

    setTitle(data.title ?? '');
    setTotalCount(Number(total) || 0);

    setItems(prev => {
      if ((page ?? 1) > 1) {
        const next = [...prev, ...incoming];
        const seen = new Set<string>();
        return next.filter((r, idx) => {
          const key = r?.id != null ? String(r.id) : `row-${idx}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      }
      return incoming;
    });
  }, [data, page]);

  const loadMore = () => {
    if (isFetching || isLoading) return;

    if (items.length >= totalCount) return;
    setPage?.((page ?? 1) + 1);
  };

  const onRefresh = () => {
    setItems([]);
    setPage?.(1);
    refetch();
  };

  const navigation = useDMKNavigation();

  return (
    <ApiStateHandler
      error={error}
      isEmpty={!isLoading && items.length === 0}
      onRetry={refetch}
      emptyTitle="No members found"
      emptySubtitle="No matching records."
    >
      <MemberListTemplate
        title={title}
        list={items}
        totalCount={totalCount}
        loadingMore={isFetching && (page ?? 1) > 1}
        refreshing={isFetching && (page ?? 1) === 1}
        onEndReached={loadMore}
        onRefresh={onRefresh}
        onPressMember={memberDetails =>
          navigateByUiType(navigation, {
            opt: {
              api: descriptor,
              label: memberDetails?.name,
              uiType: UI_TO_SCREEN.MEMBER_DETAIL as ApiUiType,
              value: memberDetails?.id,
            },
            prefetchedData: { data: memberDetails },
          })
        }
      />
    </ApiStateHandler>
  );
};

export { MembetListScreen };
