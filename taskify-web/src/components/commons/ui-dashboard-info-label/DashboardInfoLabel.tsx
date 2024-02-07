import classNames from 'classnames/bind';
import styles from './DashboardInfoLabel.module.scss';

import OwnerIcon from './owner.svg';

const cx = classNames.bind(styles);

/**
 * `DashboardInfoLabel` 컴포넌트의 props 타입을 정의합니다.
 *
 * @typedef {Object} DashboardInfoLabelProps
 * @property {'header' | 'sidebar' | 'button'} location - 컴포넌트를 사용할 위치를 지정합니다.
 * @property string - 칩의 색상을 지정합니다. (미전달시 표시안됨)
 * @property {string} text - 표시할 텍스트입니다.
 * @property {boolean} isOwner - 소유자 여부를 나타냅니다.
 */
type DashboardInfoLabelProps = {
  location: 'header' | 'sidebar' | 'button';
  chipColor?: string;
  text: string;
  isOwner: boolean;
  isOpen?: boolean;
};

/**
 * 대시보드 정보 라벨 컴포넌트
 * @param {DashboardInfoLabelProps} props - 컴포넌트에 전달되는 props.
 * @returns {React.ReactElement} - 렌더링된 `DashboardInfoLabel` 컴포넌트.
 * @alert location 값에 따라 다른 반응형 디자인이 적용됨
 */
export default function DashboardInfoLabel({
  location,
  chipColor,
  text,
  isOwner,
  isOpen = false,
}: DashboardInfoLabelProps) {
  return (
    <div className={cx('dashboard-info-label', location)}>
      {/** //TODO: 아래 chip 관련 컴포넌트는 색상 Chip Component로 대체 예정 */}
      {chipColor && (
        <div
          style={{ backgroundColor: chipColor }}
          className={cx('dashboard-color-chip', {
            hide: !isOpen,
          })}
        />
      )}
      <p className={cx('dashboard-title', { hide: !isOpen })}>{text}</p>
      {isOwner && (
        <OwnerIcon className={cx('dashboard-owner-icon', { hide: !isOpen })} />
      )}
    </div>
  );
}
