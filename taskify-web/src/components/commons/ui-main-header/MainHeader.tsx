import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './MainHeader.module.scss';
import LargeLogo from './large_logo.svg';
import SmallLogo from './small_logo.svg';

const cx = classNames.bind(styles);

type MainHeaderProps = {
  themeColor?: 'white' | 'black';
};
export default function MainHeader({ themeColor = 'white' }: MainHeaderProps) {
  return (
    <nav className={cx('container', themeColor)}>
      <Link href="/">
        <LargeLogo className={cx('largeLogo', themeColor)} />
        <SmallLogo className={cx('smallLogo', themeColor)} />
      </Link>
      <div className={cx('buttonWrap')}>
        <Link className={cx('button', themeColor)} href="/signin">
          로그인
        </Link>
        <Link className={cx('button', themeColor)} href="/signup">
          회원가입
        </Link>
      </div>
    </nav>
  );
}
