import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation';
import { LanguageProvider } from './src/i18n/LanguageProvider';
import { QueryProvider } from './src/providers';
import { getPaperTheme } from './src/providers/ThemeProvider';
import { PaperProvider } from 'react-native-paper';
import Orientation from 'react-native-orientation-locker';
import { ResponsiveProvider } from './src/theme/responsive';
import { LoaderOverlay } from './src/components/atoms';
import { IMAGES } from './src/assets';
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {
  GlobalErrorBoundary,
  GlobalErrorProvider,
} from './src/components/ui/GlobalError';
import { useAppStore } from './src/store';

const navigationRef = createNavigationContainerRef();

const navigateHome = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
  }
};

const getExtraDebug = () => ({
  navReady: navigationRef.isReady(),
});

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const paperTheme = getPaperTheme(isDarkMode);

  const { globalLoading } = useAppStore();

  useEffect(() => {
    Orientation.lockToPortrait();
    return () => Orientation.unlockAllOrientations();
  }, []);

  return (
    <SafeAreaProvider>
      <GlobalErrorBoundary
        navigateHome={navigateHome}
        getExtraDebug={getExtraDebug}
        showStack={__DEV__}
        showHeader
        headerTitle="T.N.பாளையம் ஒன்றிய திமுக"
      >
        <GlobalErrorProvider
          navigateHome={navigateHome}
          getExtraDebug={getExtraDebug}
          showHeader
          headerTitle="T.N.பாளையம் ஒன்றிய திமுக"
        >
          <QueryProvider>
            <ResponsiveProvider>
              <PaperProvider theme={paperTheme}>
                <LanguageProvider>
                  <LoaderOverlay
                    visible={globalLoading}
                    gifSource={IMAGES.loader}
                    spinnerColor="#d32f2f"
                    spinnerThickness={4}
                    backdropColor="rgba(255,255,255,0.6)"
                    blockTouch={true}
                  />
                  <RootNavigator />
                </LanguageProvider>
              </PaperProvider>
            </ResponsiveProvider>
          </QueryProvider>
        </GlobalErrorProvider>
      </GlobalErrorBoundary>
    </SafeAreaProvider>
  );
};

export default App;
