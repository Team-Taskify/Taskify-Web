import classNames from 'classnames/bind';
import styles from './ProfileLabel.module.scss';
import UserBadge from '../ui-user-badge/UserBadge';
import getRandomColor from '../ui-sub-header/utils/getRandomColor';

const cx = classNames.bind(styles);

/**
 * `ProfileLabel` 컴포넌트의 props 타입을 정의합니다.
 *
 * @typeof {object} ProfileLabelProps
 * @property {id} - /{teamid}/users/me api의 id 데이터
 * @property {email} - /{teamid}/users/me api의 email 데이터
 * @property {nickname} - /{teamid}/users/me api의 nickname 데이터
 * @property {profileImageUrl} - /{teamid}/users/me api의 profileImageUrl 데이터
 * @property {position} - 컴포넌트 별 사이즈 변경을 위한 속성
 */

type ProfileLabelProps = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  position?: 'header' | 'dropdown' | 'card';
};

export default function ProfileLabel({
  id,
  email,
  nickname,
  profileImageUrl,
  position = 'header',
}: ProfileLabelProps) {
  return (
    <div className={cx('container')}>
      <UserBadge
        location="header"
        color={getRandomColor(id)}
        text={email}
        profileImageUrl={profileImageUrl}
      />
      <span className={cx('ProfileLabelName', position)}>{nickname}</span>
    </div>
  );
}
