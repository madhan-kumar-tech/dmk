export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es' | 'fr';

export interface MemberDetailItem {
  label: string;
  value: string;
}

export interface MemberRow {
  id: number;
  memberId: string;
  name: string;
  phoneNumber: string;
  profileUrl: {
    url: string;
    fileName: string;
  };
  title: string;
  countDetails: MemberDetailItem[];
  details: MemberDetailItem[];
}

export interface MemberListResponse {
  title: string;
  list: MemberRow[];
  total: number;
}
