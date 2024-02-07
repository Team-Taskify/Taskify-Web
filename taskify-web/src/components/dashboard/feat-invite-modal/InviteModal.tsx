import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Modal } from '@/components/commons/ui-modal/Modal';
import styles from './InviteModal.module.scss';
import { Input } from '@/components/commons/ui-input/Input';
import Button from '@/components/commons/ui-button/Button';
import { useMembers } from '@/contexts/MemberProvider';

type InviteProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const cx = classNames.bind(styles);

export default function InviteModal({ isOpen, setIsOpen }: InviteProps) {
  const router = useRouter();
  const { boardId } = router.query;
  const { control, watch } = useForm({
    defaultValues: { email: '' },
    mode: 'onBlur',
  });

  const { inviteMember } = useMembers();

  const handleSubmit = async () => {
    await inviteMember(watch('email'), boardId as string);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen}>
      <form className={cx('form')}>
        <h1 className={cx('title')}>초대하기</h1>
        <label className={cx('inputContainer')}>
          이메일
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <Input {...field} isModal />}
          />
        </label>
        <div className={cx('buttonContainer')}>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            size="modalMedium"
            theme="secondary"
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!watch('email')}
            size="modalMedium"
            theme="primary"
          >
            초대
          </Button>
        </div>
      </form>
    </Modal>
  );
}
