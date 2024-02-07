import { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import styles from './PaginationButton.module.scss';
import PaginationButton from './PaginationButton';

type PaginationButtonContainerProps = {
  leftClick: MouseEventHandler<HTMLButtonElement>;
  rightClick: MouseEventHandler<HTMLButtonElement>;
  leftDisabled?: boolean;
  righttDisabled?: boolean;
};

const cx = classNames.bind(styles);

function PaginationButtonContainer({
  leftClick,
  rightClick,
  leftDisabled = false,
  righttDisabled = false,
}: PaginationButtonContainerProps) {
  return (
    <div className={cx('pagination-container')}>
      <PaginationButton onClick={leftClick} disabled={leftDisabled} />
      <PaginationButton
        onClick={rightClick}
        disabled={righttDisabled}
        flipped
      />
    </div>
  );
}

export default PaginationButtonContainer;
