import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InviteStatusList.module.scss';
import PaginationButtonContainer from '@/components/commons/ui-pagination/PaginationButtonContainer';
import Button from '@/components/commons/ui-button/Button';
import AddIcon from './add-box.svg';
import InviteStatusListItem from './InviteStatusListItem';
import { useMembers } from '@/contexts/MemberProvider';
import InviteModal from '../feat-invite-modal/InviteModal';

const cx = classNames.bind(styles);

export default function InviteStatusList() {
  const router = useRouter();
  const { boardId } = router.query;
  const [pagination, setPagination] = useState<number>(1);
  const { invitedMembersData, getInvitedMember } = useMembers();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    if (boardId !== undefined) {
      getInvitedMember(boardId as string, pagination);
    }
  }, [pagination]);
  useEffect(() => {
    if (boardId !== undefined) {
      getInvitedMember(boardId as string, pagination);
    }
  }, [boardId]);

  return (
    <>
      <InviteModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <section className={cx('container')}>
        <div className={cx('header')}>
          <div className={cx('headerTitle')}>
            <h1 className={cx('title')}>초대내역</h1>
            <div className={cx('pagination')}>
              <p className={cx('leftPage')}>
                {Math.ceil((invitedMembersData.data?.totalCount || 1) / 5)}{' '}
                페이지 중 {pagination}
              </p>
              <PaginationButtonContainer
                leftClick={() => {
                  setPagination(pagination - 1);
                }}
                rightClick={() => {
                  setPagination(pagination + 1);
                }}
                leftDisabled={(() => {
                  if (pagination <= 1) {
                    return true;
                  }
                  return false;
                })()}
                righttDisabled={(() => {
                  if (invitedMembersData) {
                    return (
                      Math.ceil(
                        (invitedMembersData.data?.totalCount || 1) / 5,
                      ) <= pagination
                    );
                  }
                  return false;
                })()}
              />
            </div>
          </div>
          <Button
            theme="primary"
            onClick={() => {
              setIsOpen(true);
            }}
            size="medium"
          >
            <AddIcon className={cx('icon')} />
            초대하기
          </Button>
        </div>
        <h2 className={cx('subtitle')}>이메일</h2>
        <ul className={cx('memberList')}>
          <InviteStatusListItem
            data={invitedMembersData.data?.invitations?.[0]}
          />
          <hr className={cx('partition')} />
          <InviteStatusListItem
            data={invitedMembersData.data?.invitations?.[1]}
          />
          <hr className={cx('partition')} />
          <InviteStatusListItem
            data={invitedMembersData.data?.invitations?.[2]}
          />
          <hr className={cx('partition')} />
          <InviteStatusListItem
            data={invitedMembersData.data?.invitations?.[3]}
          />
          <hr className={cx('partition')} />
          <InviteStatusListItem
            data={invitedMembersData.data?.invitations?.[4]}
          />
        </ul>
      </section>
    </>
  );
}
