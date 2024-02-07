import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import LargeLogo from '@/components/commons/ui-main-header/large_logo.svg';
import SmallLogo from '@/components/commons/ui-main-header/small_logo.svg';
import { useSideBar } from '@/contexts/SidebarProvider';

const cx = classNames.bind(styles);

function SidebarHeader() {
  const { isOpen } = useSideBar();
  return (
    <header className={cx('header')}>
      <LargeLogo className={cx('largeLogo', { isOpen: !isOpen })} />
      <SmallLogo className={cx('smallLogo')} />
    </header>
  );
}

export default SidebarHeader;
