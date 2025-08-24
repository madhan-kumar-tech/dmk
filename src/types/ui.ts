import { SCREEN_NAMES } from '../constants';

export type ApiUiType = 'MEMBERS_LIST' | 'ROLE_LIST' | 'MEMBER_DETAIL';

export type OptionDescriptor = {
  method: 'GET' | 'POST';
  url: string;
  payload?: Record<string, any>;
};

export type HomeOption = {
  value: number | string;
  label: string;
  uiType: ApiUiType;
  api: OptionDescriptor;
};

export const UI_TO_SCREEN: Record<ApiUiType, keyof typeof SCREEN_NAMES> = {
  MEMBERS_LIST: 'MEMBER_LIST',
  ROLE_LIST: 'TWO_OPTION_LIST',
  MEMBER_DETAIL: 'MEMBER_DETAIL',
};
