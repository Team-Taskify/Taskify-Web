import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

export type InputProps = {
  value: string | number;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange: ChangeEventHandler<HTMLInputElement>;
  hasError?: boolean;
  errorMessage?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
};

/* 필수 props : value, onChange */
/* 에러 관련 props : hasError, errorMessage */
/* 추가적인 props : placeholder, type, onBlur, name */

/* @TODO : global.scss에서 가져온 변수로 색상 구현 */

export function Input({
  type = 'text',
  value,
  onChange,
  placeholder,
  hasError = false,
  errorMessage,
  onBlur,
  name,
}: InputProps) {
  return (
    <div className={cx('container')}>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cx('input', { error: hasError })}
      />
      {hasError && (
        <span className={cx('messageContainer')}>{errorMessage}</span>
      )}
    </div>
  );
}
