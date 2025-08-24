import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import { SCREEN_NAMES } from '../constants/screens';

export type RootStackParamList = {
  [SCREEN_NAMES.MAIN]: undefined;
};

export type MainTabParamList = {
  [SCREEN_NAMES.HOME]: undefined;
};

export type TAPIDescriptor = {
  method: 'POST' | 'GET';
  url: string;
  payload?: any;
};

export type DMKStackParamList = {
  [SCREEN_NAMES.DASHBOARD]: undefined;
  [SCREEN_NAMES.MEMBER_DETAIL]: {
    title: string;
    uiType: 'MEMBER_DETAIL';
    descriptor: TAPIDescriptor;
    prefetchedData?: any;
  };
  [SCREEN_NAMES.MEMBER_LIST]: {
    title: string;
    uiType: 'MEMBERS_LIST';
    descriptor: TAPIDescriptor;
    prefetchedData?: any;
  };
  [SCREEN_NAMES.TWO_OPTION_LIST]: {
    title: string;
    uiType: 'ROLE_LIST';
    descriptor: TAPIDescriptor;
    prefetchedData?: any;
  };
  [SCREEN_NAMES.COMPLAINT_SCREEN]: undefined;
  [SCREEN_NAMES.SUCCESS_SCREEN]: { title: string; message: string };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type MainTabScreenProps<Screen extends keyof MainTabParamList> =
  NativeStackScreenProps<MainTabParamList, Screen>;

export type DMKStackScreenProps<Screen extends keyof DMKStackParamList> =
  NativeStackScreenProps<DMKStackParamList, Screen>;

export type RootNavigationProp = NavigationProp<RootStackParamList>;
export type MainTabNavigationProp = NavigationProp<MainTabParamList>;
export type DMKNavigationProp = NavigationProp<DMKStackParamList>;

export type RootRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
export type MainTabRouteProp<T extends keyof MainTabParamList> = RouteProp<
  MainTabParamList,
  T
>;
export type DMKRouteProp<T extends keyof DMKStackParamList> = RouteProp<
  DMKStackParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
