import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Dropdown from '@/components/commons/ui-dropdown/Dropdown';
import ProfileLabel from '@/components/commons/ui-profile-Label/ProfileLabel';
import UiSubHeader from '@/components/commons/ui-sub-header/SubHeader';
import SubHeaderItems from '@/components/commons/ui-sub-header/SubHeaderItems';
import SubHeaderItemsLeft from '@/components/commons/ui-sub-header/SubHeaderItemsLeft';
import SubHeaderItemsRight from '@/components/commons/ui-sub-header/SubHeaderItemsRight';
import SubHeaderName from '@/components/commons/ui-sub-header/SubHeaderName';
import { TEXT } from '@/components/commons/ui-sub-header/constant';
import { useAuth } from '@/contexts/AuthProvider';

type SubHeaderProps = {
  dashBoardInfoLabel: ReactNode;
  subHeaderButtons?: ReactNode;
  dashBoardUserList?: ReactNode;
};
export default function SubHeader({
  dashBoardInfoLabel,
  subHeaderButtons,
  dashBoardUserList,
}: SubHeaderProps) {
  const { subHeaderButtonList } = TEXT;
  const router = useRouter();

  const { user } = useAuth();

  const handleRouteOnClick = async (e: React.MouseEvent) => {
    const input = e.target as HTMLElement;
    if (input.innerText === '로그아웃') {
      sessionStorage.clear();
      router.push('/');
    }
    if (input.innerText === '내 정보') {
      router.push('/mypage');
    }
    if (input.innerText === '내 대시보드') {
      router.push('/mydashboard');
    }
  };

  // const memberData = {
  //   members: [
  //     {
  //       id: 0,
  //       userId: 5,
  //       email: 'ytring@test.com',
  //       nickname: '1',
  //       profileImageUrl: 'string',
  //     },
  //     {
  //       id: 1,
  //       userId: 6,
  //       email: 'ctring@test.com',
  //       nickname: '2',
  //       profileImageUrl: 'string',
  //     },
  //     {
  //       id: 2,
  //       userId: 7,
  //       email: 'jtring@test.com',
  //       nickname: '3',
  //       profileImageUrl: 'string',
  //     },
  //     {
  //       id: 3,
  //       userId: 8,
  //       email: 'ktring@test.com',
  //       nickname: '4',
  //       profileImageUrl: 'string',
  //     },
  //     {
  //       id: 4,
  //       userId: 9,
  //       email: 'string',
  //       nickname: '5',
  //       profileImageUrl: 'string',
  //     },
  //     {
  //       id: 5,
  //       userId: 10,
  //       email: 'string',
  //       nickname: '6',
  //       profileImageUrl: 'string',
  //     },
  //   ],

  //   totalCount: 6,
  // };
  return (
    <UiSubHeader>
      <SubHeaderName>{dashBoardInfoLabel}</SubHeaderName>
      <SubHeaderItems>
        <SubHeaderItemsLeft>{subHeaderButtons}</SubHeaderItemsLeft>
        <SubHeaderItemsRight>
          {dashBoardUserList}
          <Dropdown
            buttonList={subHeaderButtonList}
            onClick={handleRouteOnClick}
          >
            <ProfileLabel
              id={user?.id || 0}
              email={user?.email || ''}
              nickname={user?.nickname || ''}
              profileImageUrl={user?.profileImageUrl || ''}
            />
          </Dropdown>
        </SubHeaderItemsRight>
      </SubHeaderItems>
    </UiSubHeader>
  );
}
