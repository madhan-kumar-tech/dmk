import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import type { DMKStackParamList } from '../navigation/types';
import { SCREEN_NAMES } from '../constants/screens';

export const navigationRef = createNavigationContainerRef<DMKStackParamList>();

export class NavigationService {
  static navigate<T extends keyof DMKStackParamList>(
    name: T,
    params?: DMKStackParamList[T],
  ): void {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name as any, params as any);
    }
  }

  static goBack(): void {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }

  static reset(routeName: keyof DMKStackParamList, params?: any): void {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routeName as string, params }],
        }),
      );
    }
  }

  static canGoBack(): boolean {
    return navigationRef.isReady() && navigationRef.canGoBack();
  }

  static getCurrentRoute() {
    if (navigationRef.isReady()) {
      return navigationRef.getCurrentRoute();
    }
    return null;
  }

  static getCurrentRouteName(): string | undefined {
    if (navigationRef.isReady()) {
      return navigationRef.getCurrentRoute()?.name;
    }
    return undefined;
  }

  static navigateToMain(): void {
    this.navigate(SCREEN_NAMES.DASHBOARD);
  }

  static resetToHome(): void {
    this.reset(SCREEN_NAMES.DASHBOARD);
  }
}

export default NavigationService;
