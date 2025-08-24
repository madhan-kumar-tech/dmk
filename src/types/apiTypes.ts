export interface VoterStats {
  totalVoters: number;
  maleVoters: number;
  femaleVoters: number;
  othersVoters: number;
  lastUpdated: string;
}

export interface DashboardData {
  voterStats: VoterStats;
  districtInfo: {
    name: string;
    nameInTamil: string;
    code: string;
  };
  unionInfo: {
    name: string;
    nameInTamil: string;
    code: string;
  };
  quickStats: {
    totalMembers: number;
    activeWings: number;
    upcomingEvents: number;
  };
}

export interface DMKMember {
  id: string;
  name: string;
  nameInTamil: string;
  position: string;
  positionInTamil: string;
  location: string;
  locationInTamil: string;
  contactNumber?: string;
  email?: string;
  avatar?: string;
  joiningDate: string;
  isActive: boolean;
}

export interface DMKHistory {
  id: string;
  year: string;
  title: string;
  titleInTamil: string;
  description: string;
  descriptionInTamil: string;
  imageUrl?: string;
  category: 'foundation' | 'election' | 'leadership' | 'achievement';
  importance: 'high' | 'medium' | 'low';
}

export interface Wing {
  id: string;
  name: string;
  nameInTamil: string;
  description: string;
  descriptionInTamil: string;
  leader: {
    name: string;
    nameInTamil: string;
    position: string;
    avatar?: string;
  };
  memberCount: number;
  establishedYear: string;
  activities: string[];
  contactInfo?: {
    phone?: string;
    email?: string;
  };
}

export interface AdministrativePosition {
  id: string;
  title: string;
  titleInTamil: string;
  holder: {
    name: string;
    nameInTamil: string;
    avatar?: string;
    contactNumber?: string;
    email?: string;
  };
  department: string;
  departmentInTamil: string;
  responsibilities: string[];
  responsibilitiesInTamil: string[];
  location: string;
  locationInTamil: string;
  appointmentDate: string;
}

export interface Election {
  id: string;
  name: string;
  nameInTamil: string;
  type: 'municipal' | 'assembly' | 'parliamentary';
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  constituency: {
    name: string;
    nameInTamil: string;
    code: string;
  };
  candidates?: ElectionCandidate[];
  results?: ElectionResult[];
}

export interface ElectionCandidate {
  id: string;
  name: string;
  nameInTamil: string;
  party: string;
  partySymbol: string;
  age: number;
  education: string;
  avatar?: string;
}

export interface ElectionResult {
  candidateId: string;
  votes: number;
  percentage: number;
  rank: number;
  status: 'won' | 'lost';
}

export interface Ward {
  id: string;
  number: string;
  name: string;
  nameInTamil: string;
  area: string;
  areaInTamil: string;
  voterCount: number;
  boothCount: number;
  councilor?: {
    name: string;
    nameInTamil: string;
    party: string;
    contactNumber?: string;
  };
}

export interface Booth {
  id: string;
  number: string;
  name: string;
  nameInTamil: string;
  address: string;
  addressInTamil: string;
  wardId: string;
  voterCount: number;
  facilities: string[];
  accessibility: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface User {
  id: string;
  name: string;
  nameInTamil?: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  permissions: string[];
  preferences: {
    language: 'en' | 'ta';
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  lastLogin: string;
  isActive: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  category?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ListResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: ValidationError[];
  timestamp: string;
}
