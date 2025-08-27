import React, { useState } from 'react';
import { View, ScrollView, ViewStyle } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { makeStyles } from '../../theme/responsive';

import { CenterHeader } from '../molecules/CenterHeader';
import { DetailsCard } from '../molecules/DetailsCard';
import { PillTabs } from '../molecules/PillTabs';
import { BottomActions } from '../organisms/BottomActions';
import { MemberDetailItem } from '../../types';
import { AppTheme } from '../../theme';

export type Field = { label: string; value?: string | number };

export type UnifiedDetailTemplateProps = {
  avatar?: string;
  title: string;
  subtitle?: string;
  subInfo?: string;

  details?: Field[];
  labelWidth?: number;

  tabs?: { key: string; label: string }[];
  defaultTabKey?: string;

  countDetails?: MemberDetailItem[];

  outlineButtonLabel?: string;
  onPressOutlineButton?: () => void;
  footerCtaLabel?: string;
  onPressFooterCta?: () => void;

  contentStyle?: ViewStyle;
  cardStyle?: ViewStyle;
};

export const UnifiedDetailTemplate: React.FC<UnifiedDetailTemplateProps> = ({
  avatar,
  title,
  subtitle,
  subInfo,
  details = [],
  labelWidth = 120,
  tabs,
  defaultTabKey = 'about',
  countDetails = [],
  contentStyle,
  cardStyle,
}) => {
  const s = useStyles();
  const insets = useSafeAreaInsets();
  const hasTabs = Array.isArray(tabs) && tabs.length > 0;
  const [tab, setTab] = useState(defaultTabKey);

  const hasVotersTab =
    countDetails && Array.isArray(countDetails) && countDetails.length > 0;

  return (
    <SafeAreaView style={s.root} edges={['left', 'right', 'bottom']}>
      <ScrollView
        contentContainerStyle={[
          s.scroll,
          { paddingBottom: 16 + insets.bottom },
          contentStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
      >
        <CenterHeader
          avatar={avatar}
          name={title}
          role={subtitle}
          subInfo={subInfo}
        />

        {hasTabs && hasVotersTab && (
          <View style={s.tabWrap}>
            <PillTabs tabs={tabs!} value={tab} onChange={setTab} />
          </View>
        )}

        {!hasTabs || tab === 'about' ? (
          <View style={[s.cardWrap, cardStyle]}>
            <DetailsCard details={details} labelWidth={labelWidth} />
          </View>
        ) : hasVotersTab && tab === 'voters' ? (
          <DetailsCard details={countDetails} labelWidth={labelWidth} />
        ) : null}
      </ScrollView>

      <BottomActions />
    </SafeAreaView>
  );
};

const useStyles = makeStyles(r => ({
  root: { flex: 1, backgroundColor: AppTheme.colors.background.light },
  scroll: { paddingHorizontal: r.responsiveWidth(16), paddingTop: 24 },
  tabWrap: { marginTop: 12 },
  cardWrap: {
    minWidth: 0,
  } as ViewStyle,
  placeholder: { color: '#666', paddingVertical: 12, paddingHorizontal: 16 },
}));
