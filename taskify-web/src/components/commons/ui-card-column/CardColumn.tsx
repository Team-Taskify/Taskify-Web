import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './CardColumn.module.scss';

const cx = classNames.bind(styles);

type CardColumnProps = {
  children: ReactNode;
};

/**
 * `CardColumn` 컴포넌트
 * 여러 카드를 수직 방향으로 나열하여 표시하는 컨테이너
 * 주로 카드 뷰를 그룹화할 때 사용
 * 보여줄 카드들을 자식으로 전달하면 됨
 *  */
export default function CardColumn({ children }: CardColumnProps) {
  return <section className={cx('card-column')}>{children}</section>;
}
