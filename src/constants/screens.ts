export const SCREEN_NAMES = {
  MAIN: 'Main',
  HOME: 'Home',

  DASHBOARD: 'Dashboard',

  MEMBER_DETAIL: 'MemberDetail',
  MEMBER_LIST: 'MemberList',
  TWO_OPTION_LIST: 'TwoOptionList',

  COMPLAINT_SCREEN: 'ComplaintScreen',
  SUCCESS_SCREEN: 'SuccessScreen',
} as const;

export type ScreenName = (typeof SCREEN_NAMES)[keyof typeof SCREEN_NAMES];
