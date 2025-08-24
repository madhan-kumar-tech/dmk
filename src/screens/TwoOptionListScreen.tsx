import { useMemo } from 'react';
import { TwoOptionListTemplate } from '../components/templates/TwoOptionListTemplate';
import { useDMKNavigation, useDMKRoute } from '../hooks';
import { useGeneralApi } from '../hooks/useGeneralApi';
import { navigateByUiType } from '../navigation/navigateByUiType';
import { ApiDescriptor } from '../types/api';
import { ApiUiType } from '../types/ui';
import { ApiStateHandler } from '../components/states/ApiStateHandler';

export interface OptionItem {
  value: number | string;
  label: string;
  uiType: ApiUiType;
  api: ApiDescriptor;
}

export interface ListResponse {
  title: string;
  list: OptionItem[];
}

const TwoOptionListScreen: React.FC = () => {
  const { params } = useDMKRoute('TwoOptionList');
  const descriptor = useMemo(() => params.descriptor, [params.descriptor]);
  const navigation = useDMKNavigation();

  const { data, error, refetch } = useGeneralApi<any>(descriptor);

  const { list = [], title } = (data || {}) as ListResponse;

  return (
    <ApiStateHandler
      error={error}
      isEmpty={Array.isArray(list) && list.length === 0}
      onRetry={refetch}
      emptyTitle="No data found"
      emptySubtitle="No matching records."
    >
      <TwoOptionListTemplate
        title={title}
        list={list}
        onOptionSelected={(option: OptionItem) => {
          navigateByUiType(navigation, {
            opt: option,
          });
        }}
      />
    </ApiStateHandler>
  );
};

export { TwoOptionListScreen };
