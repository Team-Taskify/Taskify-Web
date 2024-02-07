import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './GoBackMain.module.scss';
import ArrowBackIcon from './arrow-back.svg';

type GoBackMainProps = {
  children: ReactNode;
};

const cx = classNames.bind(styles);

/** 뒤로가기 기능이 있는 메인 레이아웃. 뒤로가기 기능이 있는 메인은 이 컨테이너를 사용하면 됩니다. */
export default function GoBackMain({ children }: GoBackMainProps) {
  const router = useRouter();
  return (
    <div className={cx('container')}>
      <button
        type="button"
        className={cx('goBack')}
        onClick={() => {
          router.back();
        }}
      >
        <ArrowBackIcon className={cx('icon')} /> 돌아가기
      </button>
      {children}
    </div>
  );
}
