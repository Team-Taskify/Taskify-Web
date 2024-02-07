import { useRouter } from 'next/router';
import ChangeDashBoardForm from '@/components/dashboard/feat-change-dashboard-form/ChangeDashBoardForm';
import GoBackMain from '@/components/dashboard/ui-go-back-main/GoBackMain';
import { DashBoardLayout } from '@/components/page-layout/dashboard-layout/DashBoardLayout';
import SubHeader from '@/components/dashboard/feat-sub-header/SubHeader';
import SideBar from '@/components/dashboard/feat-side-bar/SideBar';
import DashboardInfoLabel from '@/components/commons/ui-dashboard-info-label/DashboardInfoLabel';
import { SidebarProvider } from '@/contexts/SidebarProvider';
import SubHeaderButton from '@/components/commons/ui-sub-header/SubHeaderButton';
import { useDashBoard } from '@/contexts/DashBoardProvider';
import DashboardUserList from '@/components/commons/ui-sub-header/DashboardUserList';
import { useAuth } from '@/contexts/AuthProvider';
import MemberList from '@/components/dashboard/feat-member-list/MemberList';
import { MemberProvider } from '@/contexts/MemberProvider';
import InviteStatusList from '@/components/dashboard/feat-invite-status-list/InviteStatusList';
import DeleteDashBoardButton from '@/components/commons/ui-delete-dashboard-button/DeleteDashBoardButton';

export default function DashBoardEdit() {
  useAuth(true);
  const router = useRouter();
  const { boardId } = router.query;
  const { dashBoards, dashBoard, deleteDashBoard } = useDashBoard();

  return (
    <SidebarProvider>
      <MemberProvider>
        <DashBoardLayout
          subHeader={
            <SubHeader
              dashBoardUserList={<DashboardUserList />}
              subHeaderButtons={
                <SubHeaderButton
                  isOwner={dashBoard.data?.createdByMe || false}
                />
              }
              dashBoardInfoLabel={
                <DashboardInfoLabel
                  location="header"
                  isOwner={dashBoard.data?.createdByMe || false}
                  text={dashBoard.data?.title || ''}
                />
              }
            />
          }
          sideBar={<SideBar data={dashBoards.data} />}
          dashboardMain={
            <GoBackMain>
              <ChangeDashBoardForm data={dashBoard.data} />
              <MemberList />
              <InviteStatusList />
              <DeleteDashBoardButton
                onClick={() => {
                  deleteDashBoard(boardId as string);
                }}
              />
            </GoBackMain>
          }
        />
      </MemberProvider>
    </SidebarProvider>
  );
}
