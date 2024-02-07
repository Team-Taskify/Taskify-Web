import Link from 'next/link';
import classNames from 'classnames/bind';
import DashboardInfoLabel from '@/components/commons/ui-dashboard-info-label/DashboardInfoLabel';
import styles from './DashBoardListItem.module.scss';
import { DashboardData } from '@/types/dashboard';

type DashBoardListItemProps = {
  isOpen: boolean;
  data: DashboardData;
};

const cx = classNames.bind(styles);

/** 대시보드 진입버튼을 수정하려면 button컴포넌트의 padding이랑 border 여부 등 수정해야 할 것이 많아 분리하여 진행 */
export function DashBoardListItem({ isOpen, data }: DashBoardListItemProps) {
  return (
    <Link
      className={cx('container', { hide: !isOpen })}
      href={`/dashboard/${data.id}`}
    >
      <DashboardInfoLabel
        location="sidebar"
        text={data?.title || ''}
        chipColor={data?.color || '#76a6ea'}
        isOwner={data?.createdByMe || false}
        isOpen={isOpen}
      />
    </Link>
  );
}
