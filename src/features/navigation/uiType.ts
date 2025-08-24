import { SCREEN_NAMES } from '../../constants';

export enum UIType {
  MEMBERS_LIST = 'MEMBERS_LIST',
  MEMBER_DETAIL = 'MEMBER_DETAIL',
  ROLE_LIST = 'ROLE_LIST',
}

export function getRouteFromUiType(uiType: string): { name: string } {
  switch (uiType) {
    case UIType.MEMBERS_LIST:
      return { name: SCREEN_NAMES.MEMBER_LIST };
    case UIType.MEMBER_DETAIL:
      return { name: SCREEN_NAMES.MEMBER_DETAIL };
    case UIType.ROLE_LIST:
      return { name: SCREEN_NAMES.TWO_OPTION_LIST };

    default:
      return { name: 'UnknownUiType' };
  }
}
