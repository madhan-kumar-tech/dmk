import React, { useCallback } from 'react';
import {
  View,
  ImageBackground,
  Image,
  ViewStyle,
  ImageStyle,
  StatusBar,
  useColorScheme,
  FlatList,
  TextStyle,
} from 'react-native';
import { AppTheme } from '../theme';
import { IMAGES } from '../assets';
import { GaugeCard } from '../components/organisms';
import { BarChartMain } from '../components/organisms/BarChartMain';
import { hs, makeStyles, vs } from '../theme/responsive';
import { GradientText } from '../components/common';
import { CardGrid } from '../components/organisms/CardGrid';
import { ComplainCard } from '../components/molecules/ComplaintCard';
import { useHomeApi } from '../hooks/useHomeApi';
import { HomeOption } from '../types/ui';
import { navigateByUiType } from '../navigation/navigateByUiType';
import { useDMKNavigation } from '../hooks';
import { APP_HEADER_UNION_TITLE, SCREEN_NAMES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiStateHandler } from '../components/states/ApiStateHandler';

type Row = HomeOption;

const HomeScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = useStyles();
  const { data, refetch, isLoading, error } = useHomeApi();
  const navigation = useDMKNavigation();

  const gauge = data?.gauge ?? null;
  const barChart = data?.barChart ?? [];
  const options = data?.options ?? [];

  const isDataEmpty =
    !gauge &&
    (!barChart || barChart.length === 0) &&
    (!options || options.length === 0);

  const onPressOpt = useCallback(
    (opt: HomeOption) => navigateByUiType(navigation, { opt }),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.root} edges={['left', 'right', 'bottom']}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'dark-content' : 'light-content'}
      />

      <ApiStateHandler
        error={error}
        isEmpty={isLoading ? false : isDataEmpty}
        onRetry={refetch}
        emptyTitle={`ஏதோ தவறு ஏற்பட்டுள்ளது`}
        emptySubtitle="மீண்டும் முயற்சிக்கவும்"
        isHeaderShown
      >
        <FlatList<Row>
          data={[]}
          numColumns={2}
          keyExtractor={(it, idx) => String(it?.value ?? `opt-${idx}`)}
          columnWrapperStyle={styles.colWrap}
          ListHeaderComponent={
            <View>
              <View
                pointerEvents="box-none"
                onStartShouldSetResponderCapture={() => false}
              >
                <ImageBackground
                  source={IMAGES.homeTopBanner}
                  style={styles.bg}
                  imageStyle={styles.bgImg}
                />

                <View style={styles.headerPad}>
                  <Image
                    source={IMAGES.homeInfoBanner}
                    style={styles.hero}
                    resizeMethod="resize"
                  />
                  <GaugeCard {...gauge} />
                  <View pointerEvents="none">
                    <BarChartMain barChartData={barChart} />
                  </View>
                  <View style={styles.captionStyle}>
                    <GradientText
                      text={APP_HEADER_UNION_TITLE}
                      textVariant="t_caption"
                    />
                    <GradientText
                      text="உறுப்பினர்கள்"
                      textVariant="t_caption"
                    />
                  </View>
                </View>
              </View>
              {options?.length ? (
                <View
                  style={{
                    paddingHorizontal: hs(27),
                  }}
                >
                  <CardGrid data={options} onPress={onPressOpt} />
                </View>
              ) : null}
            </View>
          }
          renderItem={() => null}
          ListFooterComponent={
            <View style={styles.footerPad}>
              <ComplainCard
                title="புகார்கள்"
                onPress={() =>
                  navigation.navigate(SCREEN_NAMES.COMPLAINT_SCREEN)
                }
              />
            </View>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={8}
          windowSize={7}
          maxToRenderPerBatch={8}
          removeClippedSubviews={false}
          scrollEventThrottle={16}
        />
      </ApiStateHandler>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(r => ({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background.primary,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  img: { width: '100%', resizeMode: 'cover' } satisfies ImageStyle,
  cardContainer: {
    marginHorizontal: hs(11),
  } satisfies ViewStyle,

  root: { flex: 1, backgroundColor: AppTheme.colors.background.base },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  retry: { marginTop: 8, color: '#2563EB' },

  bg: { width: '100%', height: 144, justifyContent: 'flex-end' } as ViewStyle,
  bgImg: { width: '100%', resizeMode: 'cover' } as ImageStyle,
  headerPad: { paddingHorizontal: hs(16), paddingTop: vs(12) },
  hero: { width: '100%', height: 200, resizeMode: 'contain' } as ImageStyle,

  colWrap: {} as ViewStyle,
  cell: { flex: 1, marginBottom: 12 },

  captionStyle: {
    alignItems: 'center',
    marginTop: r.responsiveHeight(16),
    marginBottom: r.responsiveHeight(12),
  } as ViewStyle,
  listContent: { paddingBottom: vs(34) },
  footerPad: { paddingHorizontal: hs(27) },
  cardGrid: {
    width: '48%',
    aspectRatio: 1.6,
    marginBottom: 12,
    borderRadius: 12,
  } satisfies ViewStyle,
  cgBgImage: {
    borderRadius: 12,
    transform: [{ translateX: -5 }],
  } satisfies ImageStyle,
  cgBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } satisfies ViewStyle,
  cgContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  } satisfies ViewStyle,
}));

export { HomeScreen };
