import classNames from 'classnames/bind';
import styles from './ProgressChip.module.scss';
import Progress from './Progress.svg';

const cx = classNames.bind(styles);

type ProgressChipProps = {
  text: string;
};

export default function ProgressChip({ text }: ProgressChipProps) {
  return (
    <div className={cx('chip')}>
      <Progress />
      <span className={cx('text')}>{text}</span>
    </div>
  );
}
