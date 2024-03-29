import Link from 'next/link';
import classNames from 'classnames/bind';
import { useSideBar } from '@/contexts/SidebarProvider';
import LargeLogo from '@/components/commons/ui-main-header/large_logo.svg';
import SmallLogo from '@/components/commons/ui-main-header/small_logo.svg';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function SidebarHeader() {
  const { isOpen } = useSideBar();
  return (
    <header className={cx('header')}>
      <Link href="/">
        <LargeLogo className={cx('largeLogo', { isOpen: !isOpen })} />
        <SmallLogo className={cx('smallLogo')} />
      </Link>
    </header>
  );
}

export default SidebarHeader;
