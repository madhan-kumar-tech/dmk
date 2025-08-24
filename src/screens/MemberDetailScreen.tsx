import { Text } from 'react-native';
import { UnifiedDetailTemplate } from '../components/templates/MemberDetailTemplate';
import { useDMKRoute } from '../hooks';
import { useGeneralApi } from '../hooks/useGeneralApi';
import { useMemo } from 'react';
import { ApiStateHandler } from '../components/states/ApiStateHandler';

const MemberDetailScreen: React.FC = () => {
  const { params } = useDMKRoute('MemberDetail');
  const descriptor = useMemo(() => params.descriptor, [params.descriptor]);

  const prefetchedData = params.prefetchedData;

  const { error, refetch } = useGeneralApi<any>(descriptor, {
    enabled: !prefetchedData,
  });

  const { countDetails, details, name, title, profileUrl, memberId } =
    prefetchedData || {};

  const profilePic = profileUrl?.url ?? undefined;

  if (!title) {
    return <Text>Loading</Text>;
  }

  return (
    <ApiStateHandler
      error={error}
      isEmpty={!details == null || !name}
      onRetry={refetch}
      emptyTitle="No details found"
      emptySubtitle="No matching records."
    >
      <UnifiedDetailTemplate
        title={name}
        subtitle={title}
        avatar={profilePic}
        subInfo={memberId}
        tabs={[
          { key: 'about', label: 'சுயவிவரம்' },
          { key: 'voters', label: 'வாக்காளர்கள்' },
        ]}
        defaultTabKey="about"
        details={details}
        countDetails={countDetails}
      />
    </ApiStateHandler>
  );
};

export { MemberDetailScreen };
