import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserStateDropdown.module.scss';
import ProfileLabel from '../ui-profile-Label/ProfileLabel';
import ProgressChip from './ProgressChip';
import { TEXT } from './constant';
import { UserData, ColumnData } from './types';

const cx = classNames.bind(styles);

/**
 * `UserStateDropdown`컴포넌트의 props 타입을 정의합니다.
 * @typeof {object} UserStateDropdownProps
 * @property {text} - 드롭다운명을 지정하는 속성입니다. 예시) 상태, 담당자
 * @property {userData} - /{teamid}/members api의 members 객체를 받는 속성입니다.
 * @property {columnData} - /{teamid}/columns api의 data 객체를 받는 속성입니다.
 * @property {IsUserDataType} - 유저데이터를 받아올지 컬럼데이터를 받아올지를 선택하는 속성입니다. true의 경우 유저데이터를 받습니다.
 * @property {setUserDataState} - 상위 컴포넌트에서 유저 데이터의 state를 받는 속성입니다.
 * @property {setColumnDataState} - 상위 컴포넌트에서 컬럼 데이터의 state를 받는 속성입니다.
 */

type UserStateDropdownProps = {
  text: string;
  userData?: Array<UserData>;
  columnData?: Array<ColumnData>;
  IsUserDataType: boolean;
  setUserDataState?: React.Dispatch<React.SetStateAction<UserData>>;
  setColumnDataState?: React.Dispatch<React.SetStateAction<ColumnData>>;
};

export default function UserStateDropdown({
  text,
  userData,
  columnData,
  setUserDataState,
  setColumnDataState,
  IsUserDataType,
}: UserStateDropdownProps) {
  const [search, setSearch] = useState<string>('');
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const [isInsert, setIsInsert] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<UserData>({
    id: 0,
    userId: 0,
    email: '',
    nickname: '',
    profileImageUrl: '',
    createdAt: '',
    updatedAt: '',
    isOwner: false,
  });
  const [columnDataInfo, setColumnDataInfo] = useState<ColumnData>({
    id: 0,
    title: '',
    teamId: '',
    dashboardId: 0,
    createdAt: '',
    updatedAt: '',
  });
  const setTime = 200;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickContainer = () => {
    setIsDropped(!isDropped);
  };

  const handleBlurContainer = () => {
    setTimeout(() => {
      setIsDropped(false);
    }, setTime);
  };

  const filterNickname = userData?.filter((p) => {
    return p.nickname
      .replace(' ', '')
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  });
  const filterColumnName = columnData?.filter((p) => {
    return p.title
      .replace(' ', '')
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  });

  const handleGetProfileInfo = (
    id: number,
    userId: number,
    nickname: string,
    email: string,
    profileImageUrl: string,
    createdAt: string,
    updatedAt: string,
    isOwner: boolean,
  ) => {
    setProfileInfo({
      id,
      userId,
      nickname,
      email,
      profileImageUrl,
      createdAt,
      updatedAt,
      isOwner,
    });
    setUserDataState?.({
      id,
      userId,
      nickname,
      email,
      profileImageUrl,
      createdAt,
      updatedAt,
      isOwner,
    });
    setIsInsert(true);
    setSearch('');
    setIsDropped(false);
  };

  const handleGetColumnInfo = (
    id: number,
    title: string,
    teamId: string,
    dashboardId: number,
    createdAt: string,
    updatedAt: string,
  ) => {
    setColumnDataInfo({ id, title, teamId, dashboardId, createdAt, updatedAt });
    setColumnDataState?.({
      id,
      title,
      teamId,
      dashboardId,
      createdAt,
      updatedAt,
    });
    setIsInsert(true);
    setSearch('');
    setIsDropped(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCancelData = () => {
    setIsInsert(false);
    setSearch('');
    setIsDropped(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  return (
    <div className={cx('container')}>
      <span className={cx('dropdown-name')}>{text}</span>
      <div className={cx('blur-container')} onBlur={handleBlurContainer}>
        {isInsert && IsUserDataType && (
          <button
            type="button"
            className={cx('profile-label-container')}
            onClick={handleCancelData}
            aria-label="profile-label-container"
          >
            <ProfileLabel
              id={profileInfo.userId}
              nickname={profileInfo.nickname}
              email={profileInfo.email}
              profileImageUrl={profileInfo.profileImageUrl}
              position="dropdown"
            />
          </button>
        )}
        {isInsert && !IsUserDataType && (
          <button
            type="button"
            className={cx('profile-label-container')}
            onClick={handleCancelData}
            aria-label="profile-label-container"
          >
            <ProgressChip text={columnDataInfo.title} size="onProgress" />
          </button>
        )}

        {!isInsert && IsUserDataType && (
          <input
            onChange={onChange}
            className={cx('input')}
            value={search}
            placeholder={TEXT.placeHolderText.UserDataPlaceHolder}
            onClick={handleClickContainer}
            ref={inputRef}
          />
        )}
        {!isInsert && !IsUserDataType && (
          <input
            onChange={onChange}
            className={cx('input')}
            value={search}
            placeholder={TEXT.placeHolderText.ColumnDataPlaceHolder}
            onClick={handleClickContainer}
            ref={inputRef}
          />
        )}
        {isDropped && IsUserDataType && (
          <div className={cx('button-list')}>
            {filterNickname?.map((data) => (
              <button
                type="button"
                key={data.id}
                className={cx('dropdown-button')}
                onClick={() =>
                  handleGetProfileInfo(
                    data.id,
                    data.userId,
                    data.nickname,
                    data.email,
                    data.profileImageUrl,
                    data.createdAt,
                    data.updatedAt,
                    data.isOwner,
                  )
                }
                aria-label={data.nickname}
              >
                <ProfileLabel
                  id={data.userId}
                  nickname={data.nickname}
                  email={data.email}
                  profileImageUrl={data.profileImageUrl}
                  position="dropdown"
                />
              </button>
            ))}
          </div>
        )}
        {isDropped && !IsUserDataType && (
          <div className={cx('button-list')}>
            {filterColumnName?.map((data) => (
              <button
                type="button"
                key={data.id}
                className={cx('dropdown-button')}
                onClick={() =>
                  handleGetColumnInfo(
                    data.id,
                    data.title,
                    data.teamId,
                    data.dashboardId,
                    data.createdAt,
                    data.updatedAt,
                  )
                }
                aria-label={data.title}
              >
                <ProgressChip text={data.title} size="onProgress" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
