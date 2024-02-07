import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './ChangePasswordForm.module.scss';
import Button from '@/components/commons/ui-button/Button';
import PasswordInput from '@/components/auth/ui-password-input/PasswordInput';
import { useAuth } from '@/contexts/AuthProvider';
import { TEXT } from './constant';
import { AuthModal } from '@/components/auth/ui-auth-modal/AuthModal';

const cx = classNames.bind(styles);

/** 비밀번호를 변경하는 폼. mypage에서만 사용합니다. */
export default function ChangePasswordForm() {
  const [modalStatus, setModalStatus] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: '',
  });
  const { watch, control, trigger, getFieldState, setValue } = useForm({
    defaultValues: { password: '', newPassword: '', newPasswordRepeat: '' },
    mode: 'onBlur',
  });
  const [isValid, setIsValid] = useState<{
    password: boolean;
    newPassword: boolean;
    newPasswordRepeat: boolean;
  }>({
    password: false,
    newPassword: false,
    newPasswordRepeat: false,
  });

  const { changePassword, error } = useAuth();

  const handleSubmit = async () => {
    const value = {
      password: watch('password'),
      newPassword: watch('newPassword'),
    };
    await changePassword({
      password: value.password,
      newPassword: value.newPassword,
    }).then(() => {
      setValue('password', '');
      setValue('newPassword', '');
      setValue('newPasswordRepeat', '');
    });
  };

  useEffect(() => {
    if (error?.response?.status === 400) {
      if (error.response?.data) {
        const message = Object.values(error.response?.data);
        setModalStatus((prevValue) => ({
          ...prevValue,
          isOpen: true,
          message: message[0],
        }));
      }
    }
  }, [error]);

  return (
    <>
      <AuthModal
        messageType="changeError"
        isOpen={modalStatus.isOpen}
        onClick={() => {
          setModalStatus((prevValue) => ({ ...prevValue, isOpen: false }));
        }}
        errorMessage={modalStatus.message}
      />
      <form className={cx('container')}>
        <h1 className={cx('title')}>{TEXT.changePassword}</h1>
        <div className={cx('formContainer')}>
          <label className={cx('inputContainer')}>
            {TEXT.password.label}
            <Controller
              control={control}
              defaultValue=""
              name="password"
              rules={{
                required: TEXT.password.required,
                pattern: {
                  value: /^(?=.*[a-zA-Z0-9]).{8,25}$/,
                  message: TEXT.password.pattern,
                },
              }}
              render={({ field, fieldState }) => (
                <PasswordInput
                  {...field}
                  onBlur={() => {
                    trigger('password').then(() => {
                      if (!getFieldState('password').invalid) {
                        setIsValid({ ...isValid, password: true });
                      } else {
                        setIsValid({ ...isValid, password: false });
                      }
                    });
                  }}
                  placeholder={TEXT.password.placeholder}
                  hasError={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </label>
          <label className={cx('inputContainer')}>
            {TEXT.newPassword.label}
            <Controller
              control={control}
              defaultValue=""
              name="newPassword"
              rules={{
                required: TEXT.newPassword.required,
                pattern: {
                  value: /^(?=.*[a-zA-Z0-9]).{8,25}$/,
                  message: TEXT.newPassword.pattern,
                },
              }}
              render={({ field, fieldState }) => (
                <PasswordInput
                  {...field}
                  onBlur={() => {
                    trigger('newPassword').then(() => {
                      if (!getFieldState('newPassword').invalid) {
                        setIsValid({ ...isValid, newPassword: true });
                      } else {
                        setIsValid({ ...isValid, newPassword: false });
                      }
                    });
                  }}
                  placeholder={TEXT.newPassword.placeholder}
                  hasError={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </label>
          <label className={cx('inputContainer')}>
            {TEXT.newPasswordRepeat.label}
            <Controller
              control={control}
              defaultValue=""
              name="newPasswordRepeat"
              rules={{
                required: TEXT.newPasswordRepeat.required,
                validate: (value) =>
                  value === watch('newPassword')
                    ? true
                    : TEXT.newPasswordRepeat.pattern,
              }}
              render={({ field, fieldState }) => (
                <PasswordInput
                  {...field}
                  onBlur={() => {
                    trigger('newPasswordRepeat').then(() => {
                      if (!getFieldState('newPasswordRepeat').invalid) {
                        setIsValid({ ...isValid, newPasswordRepeat: true });
                      } else {
                        setIsValid({ ...isValid, newPasswordRepeat: false });
                      }
                    });
                  }}
                  placeholder={TEXT.newPasswordRepeat.placeholder}
                  hasError={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </label>
        </div>

        <div className={cx('buttonContainer')}>
          <Button
            disabled={
              !isValid.password ||
              !isValid.newPassword ||
              !isValid.newPasswordRepeat
            }
            onClick={handleSubmit}
            size="medium"
          >
            {TEXT.button}
          </Button>
        </div>
      </form>
    </>
  );
}
