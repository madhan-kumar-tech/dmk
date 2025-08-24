import { useNavigation, useRoute } from '@react-navigation/native';
import type {
  DMKNavigationProp,
  DMKRouteProp,
  DMKStackParamList,
} from './types';

export const useDMKNavigation = () => useNavigation<DMKNavigationProp>();

export const useDMKRoute = <T extends keyof DMKStackParamList>(
  _screenName: T,
) => useRoute<DMKRouteProp<T>>();
