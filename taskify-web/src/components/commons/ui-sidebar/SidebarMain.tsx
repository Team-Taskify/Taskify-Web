import { HTMLProps } from 'react';

import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

type MainProp = Pick<HTMLProps<HTMLDivElement>, 'children'> & {
  isOpen: boolean;
};

function SidebarMain({ children, isOpen }: MainProp) {
  return <div className={cx('main', { hide: isOpen })}>{children}</div>;
}

export default SidebarMain;
