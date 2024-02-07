import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Controller, useForm } from 'react-hook-form';
import styles from './ChangeProfileForm.module.scss';
import Button from '@/components/commons/ui-button/Button';
import ImageInput from '@/components/commons/ui-image-input/ImageInput';
import { Input } from '@/components/commons/ui-input/Input';
import { useAuth } from '@/contexts/AuthProvider';
import { TEXT } from './constant';

const cx = classNames.bind(styles);

/** 프로필 변경 폼. mypage에서만 사용합니다. */
export default function ChangeProfileForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [imageData, setImageData] = useState<{
    data: File | undefined;
    preview: string;
  }>({
    data: undefined,
    preview: '',
  });
  const [isValid, setIsValid] = useState<boolean>(true);
  const { user, updateMe } = useAuth(true);

  const { control, trigger, getFieldState, setValue, watch } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (user) {
      setImageData((prev) => ({
        ...prev,
        preview: user?.profileImageUrl ? user?.profileImageUrl : '',
      }));
      setValue('nickname', user.nickname);
    }
  }, [user]);

  const handleSubmit = async () => {
    await updateMe({ nickname: watch('nickname'), image: imageData.data });
  };

  return (
    <form className={cx('container')}>
      <h1 className={cx('title')}>{TEXT.profile}</h1>
      <div className={cx('form')}>
        <ImageInput
          inputRef={inputRef}
          imageData={imageData}
          setImageData={setImageData}
        />
        <div className={cx('formContainer')}>
          <label className={cx('inputContainer')}>
            {TEXT.email}
            <Input onChange={() => {}} value={user?.email || ''} disabled />
          </label>
          <label className={cx('inputContainer')}>
            {TEXT.nickname.label}
            <Controller
              control={control}
              name="nickname"
              rules={{
                required: TEXT.nickname.required,
                pattern: {
                  value: /^.{1,10}$/,
                  message: TEXT.nickname.message,
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  onBlur={() => {
                    trigger('nickname').then(() => {
                      if (!getFieldState('nickname').invalid) {
                        setIsValid(true);
                      } else {
                        setIsValid(false);
                      }
                    });
                  }}
                  hasError={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </label>
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <Button disabled={!isValid} onClick={handleSubmit} size="medium">
          저장
        </Button>
      </div>
    </form>
  );
}
