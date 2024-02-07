import React, { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import styles from './PaginationButton.module.scss';
import ArrowIcon from './arrow.svg';

const cx = classNames.bind(styles);

type PaginationButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  flipped?: boolean;
  disabled?: boolean;
};

function PaginationButton({
  onClick,
  flipped,
  disabled,
}: PaginationButtonProps) {
  const paginationClass = cx('pagination-button', {
    flipped,
  });

  return (
    <div>
      <button
        type="button"
        className={paginationClass}
        onClick={onClick}
        disabled={disabled}
      >
        <div className={cx('button-content')}>
          <span className={cx('text')}>페이지네이션</span>
          <ArrowIcon className={cx('arrow-icon', { disabled })} />
        </div>
      </button>
    </div>
  );
}

PaginationButton.defaultProps = {
  flipped: false,
  disabled: false,
};

export default PaginationButton;
