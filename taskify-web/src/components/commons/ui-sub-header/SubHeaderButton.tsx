import { useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import SettingIcon from './Setting.svg';
import InviteIcon from './Invite.svg';
import styles from './SubHeaderButton.module.scss';
import InviteModal from '@/components/dashboard/feat-invite-modal/InviteModal';

const cx = classNames.bind(styles);

type SubHeaderButtonProps = {
  isOwner?: boolean;
};

export default function SubHeaderButton({
  isOwner = false,
}: SubHeaderButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <InviteModal isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOwner && (
        <button
          className={cx('button', 'setting')}
          type="button"
          onClick={() => {
            if (!router.asPath.includes('edit')) {
              router.push('./edit');
            }
          }}
        >
          <SettingIcon className={cx('icon')} />
          <span>관리</span>
        </button>
      )}
      {isOwner && (
        <button
          className={cx('button', 'invite')}
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <InviteIcon className={cx('icon')} />
          <span>초대하기</span>
        </button>
      )}
    </>
  );
}
