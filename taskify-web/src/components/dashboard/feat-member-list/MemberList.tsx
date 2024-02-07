import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MemberList.module.scss';
import PaginationButtonContainer from '@/components/commons/ui-pagination/PaginationButtonContainer';
import MemberListItem from './MemberListItem';
import { useMembers } from '@/contexts/MemberProvider';

const cx = classNames.bind(styles);

export default function MemberList() {
  const { paginationedMembersData, getPaginationedMembers } = useMembers();
  const [pagination, setPagination] = useState<number>(3);

  return (
    <section className={cx('container')}>
      <div className={cx('header')}>
        <h1 className={cx('title')}>구성원</h1>
        <div className={cx('pagination')}>
          {paginationedMembersData && (
            <p className={cx('leftPage')}>
              {Math.ceil((paginationedMembersData.data?.totalCount || 1) / 4)}{' '}
              페이지 중 {pagination}
            </p>
          )}
          <PaginationButtonContainer
            leftClick={() => {
              getPaginationedMembers(pagination - 1);
              setPagination(pagination - 1);
            }}
            rightClick={() => {
              getPaginationedMembers(pagination + 1);
              setPagination(pagination + 1);
            }}
            leftDisabled={(() => {
              if (pagination <= 1) {
                return true;
              }
              return false;
            })()}
            righttDisabled={(() => {
              if (paginationedMembersData) {
                return (
                  Math.ceil(
                    (paginationedMembersData.data?.totalCount || 1) / 4,
                  ) <= pagination
                );
              }

              return false;
            })()}
          />
        </div>
      </div>
      <h2 className={cx('subtitle')}>이름</h2>
      <ul className={cx('memberList')}>
        <MemberListItem data={paginationedMembersData.data?.members?.[0]} />
        <hr className={cx('partition')} />
        <MemberListItem data={paginationedMembersData.data?.members?.[1]} />
        <hr className={cx('partition')} />
        <MemberListItem data={paginationedMembersData.data?.members?.[2]} />
        <hr className={cx('partition')} />
        <MemberListItem data={paginationedMembersData.data?.members?.[3]} />
      </ul>
    </section>
  );
}
