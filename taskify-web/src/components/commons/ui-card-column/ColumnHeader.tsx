import { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import styles from './ColumnHeader.module.scss';
import SettingIcon from '../../../../public/images/setting.svg';

const cx = classNames.bind(styles);

/**
 * ColumnHeader 컴포넌트 속성
 * 
 * @typedef {Object} ColumnHeadeProps
 * @property {string} columnName - 컬럼 이름.
 * @property {number} columnItemCount - 컬럼 내 항목의 수
 * @property {MouseEventHandler} columnSettingOnClick - 컬럼 설정 아이콘의 클릭 이벤트 핸들러
 */
type ColumnHeaderProps = {
  columnName: string;
  columnItemCount: number;
  columnSettingOnClick: MouseEventHandler;
};

/**
 * ColumnHeader
 * 컬럼의 헤더를 포함한 이름, 항목 수, 설정 아이콘을 렌더링
 * 그리드나 테이블 내의 컬럼에 대한 사용자 정의 가능한 헤더를 표시
 */
export default function ColumnHeader({
  columnName,
  columnItemCount,
  columnSettingOnClick,
}: ColumnHeaderProps) {
  return (
    <header className={cx('column-header')}>
      <div className={cx('column-header__name-label')}>
        {/** TODO: mini-size design이 추가된 ColorChip 사용 */}
        <div className={cx('column-header__name-label_color-chip')} />
        <h1 className={cx('column-header__name-label_name')}>{columnName}</h1>
        {/** TODO: 할일 개수 Chip 추가해야 함 */}
        <span>{columnItemCount}</span>
      </div>
      <SettingIcon
        className={cx('column-header__setting-icon')}
        onClick={columnSettingOnClick}
      />
    </header>
  );
}
