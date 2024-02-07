import { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import styles from './AuthModal.module.scss';
import { Modal } from '@/components/commons/ui-modal/Modal';
import Button from '@/components/commons/ui-button/Button';
import { TEXT } from './constant';

type AuthModalProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
  messageType: 'signInError' | 'signUpError' | 'signUpSuccess' | 'changeError';
  errorMessage?: string;
};

const cx = classNames.bind(styles);

/**
 *  @alert : 로그인 / 회원가입에서 사용하는 모달 컴포넌트
 *  @props messagetype - signInError(로그인 실패), signUpError(이메일 중복), signUpSuccess(회원가입 성공)
 */
export function AuthModal({
  messageType = 'signInError',
  isOpen,
  onClick,
  errorMessage = '',
}: AuthModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <div className={cx('main')}>
        {messageType !== 'changeError' ? TEXT[messageType] : errorMessage}
      </div>
      <div className={cx('footer')}>
        <Button size="modalMedium" onClick={onClick}>
          확인
        </Button>
      </div>
    </Modal>
  );
}
