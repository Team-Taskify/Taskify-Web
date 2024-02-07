import classNames from 'classnames/bind';
import styles from './DashboardUserList.module.scss';
import UserBadge from '../ui-user-badge/UserBadge';
import getWindowSize from './utils/getWindowSize';
import getRandomColor from './utils/getRandomColor';
import getRemainNumber from './utils/getRemainNumber';
import { Members } from '@/types/dashboard';

const cx = classNames.bind(styles);

type DashboardUserListProps = {
  memberData: Members | null;
};

export default function DashboardUserList({
  memberData,
}: DashboardUserListProps) {
  const { width } = getWindowSize();

  return (
    <div className={cx('container')}>
      <div className={cx('memberList')}>
        {memberData &&
          memberData.members.map((member) => (
            <UserBadge
              location="header"
              key={member.id}
              color={getRandomColor(member.userId)}
              text={member.email}
              profileImageUrl=""
            />
          ))}
        {getRemainNumber(width, memberData?.totalCount || 0) > 0 && (
          <UserBadge
            location="header"
            color="pink"
            text={`+${getRemainNumber(width, memberData?.totalCount || 0)}`}
            profileImageUrl=""
            IsTwoWord
          />
        )}
      </div>
    </div>
  );
}
