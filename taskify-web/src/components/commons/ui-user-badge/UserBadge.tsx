import classNames from 'classnames/bind';
import styles from './UserBadge.module.scss';

const cx = classNames.bind(styles);

/**
 * `UserBadgeProps는 사용자 칩 컴포넌트의 속성을 정의하는 타입입니다.`
 * 이 타입은 칩의 색상(color), 닉네임 첫 글자(text), 두 글자를 표시할지의 여부 (IsTwoWord), 프로필 이미지(profileImageUrl), 컴포넌트 위치 별 크기 지정(location)로 구성되어있습니다.
 *
 * @typeof {object} UserBadgeProps
 * @property {'orange' | 'pink' | 'brown' | 'sky'} color - 칩의 4가지 색상중 1개를 props로 내려받아 표시, 부모컴포넌트에서 칩의 색상을 랜덤으로 가져옴
 * @property {string} text - 사용자 닉네임의 첫글자를 칩의 정가운데에 표시
 * @property {string} profileImageUrl - 프로필이미지가 등록된 사용자의 경우 색상칩이 아닌 프로필이미지로 표시
 * @property {boolean} IsTwoWord - 두 글자를 가져온다면 true 값을 props로 내려 받아 표시, 기본 값은 false로 한글자만 표시
 * @property {'header' | 'card' | 'column' | 'dropdown' | 'member'} location - 각 컴포넌트에 맞게 뱃지크기를 변경합니다.
 */

type UserBadgeProps = {
  color: 'orange' | 'pink' | 'brown' | 'sky';
  text: string;
  profileImageUrl?: string;
  IsTwoWord?: boolean;
  location: 'header' | 'card' | 'column' | 'dropdown' | 'member';
};

export default function UserBadge({
  color,
  text,
  profileImageUrl = '',
  IsTwoWord = false,
  location,
}: UserBadgeProps) {
  const firstWord = text.charAt(0);
  const twoWord = text.substring(0, 2);

  return (
    <div>
      {!profileImageUrl &&
        (IsTwoWord ? (
          <div className={cx('Badge', color, location)}>
            <span className={cx('Badge-text', 'twoWord-text')}>{twoWord}</span>
          </div>
        ) : (
          <div className={cx('Badge', color, location)}>
            <span className={cx('Badge-text')}>{firstWord}</span>
          </div>
        ))}
      {profileImageUrl && (
        <img
          className={cx('Badge', 'image', location)}
          src={profileImageUrl}
          alt="프로필 이미지"
        />
      )}
    </div>
  );
}
