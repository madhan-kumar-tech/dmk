import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StatusBar, ViewStyle, TextStyle } from 'react-native';
import { makeStyles, hs, vs } from '../theme/responsive';
import { AppText } from '../components/ui';
import { TickSVG } from '../svg';
import { BottomActions } from '../components/organisms';
import { useDMKRoute } from '../hooks';

export const SuccessScreen: React.FC = () => {
  const { params } = useDMKRoute('SuccessScreen');
  const s = useStyles();

  return (
    <SafeAreaView style={s.root} edges={['left', 'right', 'bottom']}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={s.body}>
        <TickSVG width={hs(140)} height={hs(140)} />

        <AppText variant="t_header" style={s.title}>
          {params?.title ?? 'உங்கள் புகார் வெற்றிகரமாக\nசமர்ப்பிக்கப்பட்டது'}
        </AppText>
      </View>

      <BottomActions hideBackButton />
    </SafeAreaView>
  );
};

const useStyles = makeStyles(() => ({
  root: { flex: 1, backgroundColor: '#F7FFF5' } as ViewStyle,
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: hs(24),
  } as ViewStyle,
  tickWrap: {
    width: hs(180),
    height: hs(180),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hs(90),
    backgroundColor: '#EAF6EC',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    marginBottom: vs(20),
  } as ViewStyle,
  title: { textAlign: 'center', lineHeight: 28, marginTop: vs(6) } as TextStyle,
}));
