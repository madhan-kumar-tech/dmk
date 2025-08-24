import React, { useRef } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { PersonListItem } from '../molecules/PersonListItem';
import { hs, makeStyles, vs } from '../../theme/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../ui';
import type { MemberRow } from '../../types';
import { BottomActions } from '../organisms';

type Props = {
  title?: string;
  list: MemberRow[];
  totalCount?: number;
  loadingMore?: boolean;
  refreshing?: boolean;
  onEndReached?: () => void;
  onRefresh?: () => void;
  onPressMember: (personDetails: MemberRow) => void;
};

export const MemberListTemplate: React.FC<Props> = ({
  title,
  list,
  totalCount = 0,
  loadingMore = false,
  refreshing = false,
  onEndReached,
  onRefresh,
  onPressMember,
}) => {
  const s = useStyles();
  const canTriggerRef = useRef(true);

  return (
    <SafeAreaView style={s.root} edges={['left', 'right', 'bottom']}>
      <AppText
        variant="t_header"
        style={{
          marginHorizontal: hs(16),
          paddingTop: vs(24),
          paddingBottom: vs(8),
        }}
      >
        {title}
      </AppText>

      <View style={s.body}>
        <FlatList
          data={list}
          keyExtractor={(i, idx) => String(i?.id ?? `row-${idx}`)}
          renderItem={({ item }) => (
            <PersonListItem
              name={item.name}
              phoneNumber={item.phoneNumber}
              avatar={item?.profileUrl?.url}
              onPress={() => onPressMember(item)}
            />
          )}
          onMomentumScrollBegin={() => {
            canTriggerRef.current = true;
          }}
          onEndReached={() => {
            if (!canTriggerRef.current) return;
            canTriggerRef.current = false;
            onEndReached?.();
          }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListFooterComponent={
            loadingMore ? (
              <View style={{ paddingVertical: 16 }}>
                <ActivityIndicator />
                <AppText
                  variant="caption"
                  style={{ textAlign: 'center', marginTop: 6 }}
                >
                  Loading {list.length}
                  {totalCount ? ` / ${totalCount}` : ''}
                </AppText>
              </View>
            ) : null
          }
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        />
      </View>
      <BottomActions />
    </SafeAreaView>
  );
};

const useStyles = makeStyles(() => ({
  root: { flex: 1, backgroundColor: '#f6f7f8' },
  body: { flex: 1 },
}));
