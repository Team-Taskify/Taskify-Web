import classNames from 'classnames/bind';
import { MouseEvent } from 'react';
import Image from 'next/image';
import styles from './Card.module.scss';
import UserBadge from '../ui-user-badge/UserBadge';
import Calendar from './calendar.svg';
import ChipSubject from '../ui-chip-subject/chipSubject';

const cx = classNames.bind(styles);

/**
 * `Card` 컴포넌트의 프로퍼티 타입을 정의합니다.
 *
 * @property {string} [imageUrl] - 카드에 표시될 이미지의 URL입니다. 이미지가 없는 경우 생략할 수 있습니다.
 * @property {string} title - 카드 제목을 나타냅니다.
 * @property {string[]} [tags] - 카드에 표시될 태그들의 배열입니다. 선택적으로 사용할 수 있습니다.
 * @property {string} [expiredDate] - 카드의 만료 날짜입니다. 선택적으로 사용할 수 있습니다.
 * @property {string} [user] - 카드를 생성한 사용자의 이름입니다. 선택적으로 사용할 수 있습니다.
 * @property {boolean} [clickable] - 카드가 클릭 가능한지 여부를 나타냅니다. 기본값은 `false`입니다.
 * @property {Function} [onClick] - 카드 클릭 시 실행될 콜백 함수입니다.
 */
type CardProps = {
  imageUrl?: string;
  title: string;
  /**TODO: tag에 대한 type을 추후 추가로 신설해야할 듯  */
  tags?: string[];
  /**TODO: expiredDate type 명확히  */
  expiredDate?: string;
  user?: string;
  clickable?: boolean;
  onClick?: (e: MouseEvent) => void;
};


/**
 * `Card` 컴포넌트는 사용자 인터페이스에 카드 형태의 요소를 렌더링합니다.
 * 각 카드는 이미지, 제목, 태그, 만료 날짜 등의 정보를 포함할 수 있습니다.
 * 
 * @property {string} [imageUrl] - 카드에 표시될 이미지의 URL입니다. 이미지가 없는 경우 생략할 수 있습니다.
 * @property {string} title - 카드 제목을 나타냅니다.
 * @property {string[]} [tags] - 카드에 표시될 태그들의 배열입니다. 선택적으로 사용할 수 있습니다.
 * @property {string} [expiredDate] - 카드의 만료 날짜입니다. 선택적으로 사용할 수 있습니다.
 * @property {string} [user] - 카드를 생성한 사용자의 이름입니다. 선택적으로 사용할 수 있습니다.
 * @property {boolean} [clickable] - 카드가 클릭 가능한지 여부를 나타냅니다. 기본값은 `false`입니다.
 * @property {Function} [onClick] - 카드 클릭 시 실행될 콜백 함수입니다.
 * @returns {React.ReactElement} `Card` 컴포넌트의 렌더링 결과를 나타내는 React 엘리먼트입니다.
 */
export default function Card({
  imageUrl,
  title,
  tags,
  expiredDate,
  user,
  clickable,
  onClick = () => {},
}: CardProps) {
  return (
    <button
      className={cx('button_unstyled')}
      type="button"
      onClick={onClick}
      disabled={!clickable}
    >
      <article className={cx('card-container', { clickable })}>
        {imageUrl && (
          <div className={cx('card-container__thumbnail')}>
            <Image
              src={imageUrl}
              alt={`${title} 카드`}
              objectFit="cover"
              fill
            />
          </div>
        )}
        <header className={cx('card-container__header')}>
          <h1 className={cx('card-container__title')}>{title}</h1>
        </header>
        <section className={cx('card-container__section')}>
          <div className={cx('card-container__tags')}>
            {/** TODO: color 적용 */}
            {tags?.map((tag) => {
              return <ChipSubject label={tag} key={tag} />;
            })}
          </div>
        </section>
        <footer className={cx('card-container__footer')}>
          <div className={cx('card-container__expired-date')}>
            <Calendar className={cx('card-container__expired-date_icon')} />
            {expiredDate && (
              <span className={cx('card-container__expired-date_text')}>
                {expiredDate}
              </span>
            )}
          </div>
          {/** TODO: user가 있으면 UserBadge에 userData에 맞게 데이터를 불러와야함 */}
          {/** TODO: 반응형 userBadge 적용 */}
          {user && <UserBadge text={user} color="orange" />}
        </footer>
      </article>
    </button>
  );
}
