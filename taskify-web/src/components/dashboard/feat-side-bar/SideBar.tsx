import { useState } from 'react';
import classNames from 'classnames/bind';
import UiSideBar from '@/components/commons/ui-sidebar/Sidebar';
import SidebarHeader from '@/components/commons/ui-sidebar/SidebarHeader';
import SidebarMain from '@/components/commons/ui-sidebar/SidebarMain';
import styles from './SideBar.module.scss';
import AddIcon from './add-box.svg';
import { useSideBar } from '@/contexts/SidebarProvider';
import { DashBoardListItem } from '../ui-dashboard-list-item/DashBoardListItem';
import { DashboardsData } from '@/types/dashboard';
import AddDashboardModal from '../feat-add-dashboard-modal/AddDashboardModal';

const cx = classNames.bind(styles);

type SideBarProps = {
  data: DashboardsData | null;
};

/** sidebar 기능적 컴포넌트입니다. */
export default function SideBar({ data }: SideBarProps) {
  const { isOpen } = useSideBar();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <AddDashboardModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <UiSideBar>
        <SidebarHeader />
        <SidebarMain isOpen={isOpen}>
          <button
            className={cx('container', { center: !isOpen })}
            type="button"
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            <span className={cx('text', { hide: !isOpen })}>Dash Boards</span>
            <AddIcon className={cx('icon', { center: !isOpen })} />
          </button>
          {data?.dashboards &&
            data.dashboards.map((items) => (
              <DashBoardListItem key={items.id} data={items} isOpen={isOpen} />
            ))}
        </SidebarMain>
        {/** @TODO SideBarFooter 위치 */}
      </UiSideBar>
    </>
  );
}
