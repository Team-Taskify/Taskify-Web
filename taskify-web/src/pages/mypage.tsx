import DashboardInfoLabel from '@/components/commons/ui-dashboard-info-label/DashboardInfoLabel';
import ChangePasswordForm from '@/components/dashboard/feat-change-password-form/ChangePasswordForm';
import ChangeProfileForm from '@/components/dashboard/feat-change-profile-form/ChangeProfileForm';
import SideBar from '@/components/dashboard/feat-side-bar/SideBar';
import SubHeader from '@/components/dashboard/feat-sub-header/SubHeader';
import GoBackMain from '@/components/dashboard/ui-go-back-main/GoBackMain';
import { DashBoardLayout } from '@/components/page-layout/dashboard-layout/DashBoardLayout';
import { useDashBoard } from '@/contexts/DashBoardProvider';
import { SidebarProvider } from '@/contexts/SidebarProvider';

export default function MyPage() {
  const { dashBoards } = useDashBoard();
  return (
    <SidebarProvider>
      <DashBoardLayout
        subHeader={
          <SubHeader
            dashBoardInfoLabel={
              <DashboardInfoLabel
                location="header"
                text="계정 관리"
                isOwner={false}
              />
            }
          />
        }
        sideBar={<SideBar data={dashBoards.data} />}
        dashboardMain={
          <GoBackMain>
            <ChangeProfileForm />
            <ChangePasswordForm />
          </GoBackMain>
        }
      />
    </SidebarProvider>
  );
}
