import classNames from 'classnames/bind';
import styles from './NumChip.module.scss';

const cx = classNames.bind(styles);

type NumChipProps = {
  countNumber: number;
};
export default function NumChip({ countNumber }: Props) {
  return (
    <div className={cx('NumChip')}>
      <span className={cx('countNumber')}>{countNumber}</span>
    </div>
  );
}
