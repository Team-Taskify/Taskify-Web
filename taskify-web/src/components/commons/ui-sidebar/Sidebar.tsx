import React, { ReactNode, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import ArrowComponent from './draw-arrow.svg';
import OpenStatus, { reverseOpenStatus } from './OpenStatus';

const cx = classNames.bind(styles);

type Drawable = {
  isOpened: OpenStatus;
};

// DrawableProps를 전달하지 않으면 열고 닫을 수 없음
type SidebarProps = {
  children: ReactNode;
  drawableProps?: Drawable;
};

export default function Sidebar({
  children,
  drawableProps = {
    isOpened: OpenStatus.OPEN,
  },
}: SidebarProps) {
  const { isOpened: initIsOpened } = drawableProps;
  const [isOpened, setIsOpened] = useState<OpenStatus>(initIsOpened);

  const onArrowClickHandler = () => {
    const newStatus = reverseOpenStatus(isOpened);
    setIsOpened(newStatus);
  };

  return (
    <aside className={cx('container', isOpened)}>
      <ArrowComponent
        className={cx('draw-arrow', isOpened)}
        onClick={onArrowClickHandler}
      />
      {children}
    </aside>
  );
}
