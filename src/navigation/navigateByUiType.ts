import { SCREEN_NAMES } from '../constants/screens';
import { ApiUiType, UI_TO_SCREEN, type HomeOption } from '../types/ui';
import type { NavigationProp } from '@react-navigation/native';
import type { DMKStackParamList } from './types';

type NavArgs = {
  opt: HomeOption;
  prefetchedData?: {
    data: any;
  };
};

const PUSH_UI_TYPES: ReadonlySet<ApiUiType> = new Set([
  'ROLE_LIST',
  'MEMBERS_LIST',
]);

export function navigateByUiType(
  navigation: NavigationProp<DMKStackParamList>,
  args: NavArgs,
) {
  if (!args?.opt) {
    return;
  }

  const routeKey = UI_TO_SCREEN[args.opt.uiType];

  if (!routeKey) {
    return;
  }

  const shouldPush = PUSH_UI_TYPES.has(args?.opt?.uiType);
  if (shouldPush && (navigation as any).push) {
    (navigation as any).push(SCREEN_NAMES[routeKey] as any, {
      descriptor: args.opt.api,
      prefetchedData: args.prefetchedData?.data,
    });
  } else {
    navigation.navigate(SCREEN_NAMES[routeKey] as any, {
      descriptor: args.opt.api,
      prefetchedData: args.prefetchedData?.data,
    });
  }
}
