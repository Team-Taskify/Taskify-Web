import classNames from 'classnames/bind';
import styles from './MemberListItem.module.scss';
import Button from '@/components/commons/ui-button/Button';
import ProfileLabel from '@/components/commons/ui-profile-Label/ProfileLabel';
import { Member } from '@/types/dashboard';
import { useMembers } from '@/contexts/MemberProvider';

const cx = classNames.bind(styles);

type MemberListItemProps = {
  data: Member | undefined;
};

export default function MemberListItem({ data }: MemberListItemProps) {
  const { deleteMember } = useMembers();
  return (
    <li className={cx('container')}>
      {data && (
        <>
          <ProfileLabel
            email={data.email}
            id={data.id}
            nickname={data.nickname}
            profileImageUrl={data.profileImageUrl}
            position="card"
          />
          {!data.isOwner && (
            <Button
              onClick={() => {
                deleteMember(data.id);
              }}
              size="small"
              theme="secondary"
            >
              삭제
            </Button>
          )}
        </>
      )}
    </li>
  );
}
