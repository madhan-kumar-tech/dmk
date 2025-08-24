export interface VoterStats {
  totalVoters: number;
  maleVoters: number;
  femaleVoters: number;
  othersVoters: number;
  lastUpdated: string;
}

export interface PanchayatStats {
  id: string;
  name: string;
  nameInTamil: string;
  totalVoters: number;
  maleVoters: number;
  femaleVoters: number;
  completionPercentage: number;
}

export interface DistrictInfo {
  districtName: string;
  districtNameInTamil: string;
  unionName: string;
  unionNameInTamil: string;
}

export interface ComplaintSummary {
  totalComplaints: number;
  pendingComplaints: number;
  resolvedComplaints: number;
  urgentComplaints: number;
}

export interface HomeDashboardData {
  districtInfo: DistrictInfo;
  voterStats: VoterStats;
  panchayatStats: PanchayatStats[];
  complaintSummary: ComplaintSummary;
}

export interface HomeDashboardResponse {
  success: boolean;
  data: HomeDashboardData;
  message?: string;
  timestamp: string;
}
