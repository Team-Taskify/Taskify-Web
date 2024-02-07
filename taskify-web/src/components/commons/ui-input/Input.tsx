import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
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
  isModal?: boolean;
  errorMessage?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  disabled?: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
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
  isModal = false,
  errorMessage,
  onBlur,
  name,
  disabled = false,
  onKeyDown,
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
        onKeyDown={onKeyDown}
        className={cx('input', { error: hasError }, { modal: isModal })}
        disabled={disabled}
      />
      {hasError && (
        <span className={cx('messageContainer')}>{errorMessage}</span>
      )}
    </div>
  );
}
