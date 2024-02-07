/** dashboard 정보 인터페이스 */
export interface DashboardData {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

/** getDashboards의 응답 데이터 인터페이스 */
export interface DashboardsData {
  cursorId: number;
  totalCount: number;
  dashboards: DashboardData[];
}

export interface ChangeDashBoardForm {
  title: string;
  color: string;
}

export interface Member {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: string;
  userId: number;
}

export interface Members {
  members: Member[];
  totalCount: number;
}

export interface Invitation {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: '2-11';
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: 'string';
  updatedAt: 'string';
}

export interface Invites {
  totalCount: number;
  invitations: Invitation[];
}
