import classNames from 'classnames/bind';
import styles from './DashboardUserList.module.scss';
import UserBadge from '../ui-user-badge/UserBadge';
import getWindowSize from './utils/getWindowSize';
import getRandomColor from './utils/getRandomColor';
import getRemainNumber from './utils/getRemainNumber';
import { useMembers } from '@/contexts/MemberProvider';

const cx = classNames.bind(styles);

export default function DashboardUserList() {
  const { width } = getWindowSize();

  const { membersData } = useMembers();

  return (
    <div className={cx('container')}>
      <div className={cx('memberList')}>
        {membersData &&
          membersData.data?.members.map((member) => (
            <UserBadge
              location="header"
              key={member.id}
              color={getRandomColor(member.userId)}
              text={member.email}
              profileImageUrl=""
            />
          ))}
        {getRemainNumber(width, membersData.data?.totalCount || 0) > 0 && (
          <UserBadge
            location="header"
            color="pink"
            text={`+${getRemainNumber(width, membersData.data?.totalCount || 0)}`}
            profileImageUrl=""
            IsTwoWord
          />
        )}
      </div>
    </div>
  );
}
