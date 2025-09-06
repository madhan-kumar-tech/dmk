import React from 'react';
import { FlatList, TextStyle, View, ViewStyle } from 'react-native';
import { Card } from '../molecules/Card';
import { hs, makeStyles, vs } from '../../theme/responsive';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomActions } from '../organisms';
import { AppText } from '../ui';
import { ApiDescriptor } from '../../types/api';
import { ApiUiType } from '../../types/ui';
import { AppTheme } from '../../theme';
import ArrowRightIcon from '../../svg/RightArrowSvg';

export interface OptionItem {
  value: number | string;
  label: string;
  uiType: ApiUiType;
  api: ApiDescriptor;
}
type Props = {
  title: string;
  list: OptionItem[];
  bottomCtaLabel?: string;
  onBottomCta?: () => void;
  onOptionSelected?: (option: OptionItem) => void;
};

export const TwoOptionListTemplate: React.FC<Props> = ({
  title,
  list,
  onOptionSelected = () => {},
}) => {
  const s = useStyles();
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
          scrollsToTop={true}
          keyExtractor={i => i.label}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.9}
              style={{
                marginVertical: 8,
              }}
              onPress={() => {
                onOptionSelected(item);
              }}
            >
              <Card style={s.item}>
                <AppText style={s.optionText} variant="t_caption">
                  {item.label}
                </AppText>
                <ArrowRightIcon width={18} height={18} color="black" />
              </Card>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        />
      </View>

      <BottomActions />
    </SafeAreaView>
  );
};

const useStyles = makeStyles(() => ({
  root: { flex: 1, backgroundColor: AppTheme.colors.background.light },
  body: { flex: 1 },
  footer: { padding: 16, backgroundColor: '#fff' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } satisfies ViewStyle,
  optionText: {
    color: '#000000',
    flex: 1,
  } satisfies TextStyle,
}));
