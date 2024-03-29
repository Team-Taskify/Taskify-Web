import { MouseEventHandler, ChangeEventHandler } from 'react';
import classNames from 'classnames/bind';
import Button from '../ui-button/Button';
import styles from './CommentTextarea.module.scss';

const cx = classNames.bind(styles);

type TextareaComponentProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  buttonText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  isEdit?: boolean;
  onCancel: MouseEventHandler<HTMLButtonElement>;
};

export default function CommentTextarea({
  value,
  onChange,
  buttonText,
  onClick,
  disabled,
  isEdit = false,
  onCancel,
}: TextareaComponentProps) {
  return (
    <div className={cx('commentTextarea-container')}>
      <textarea
        id="commentTextarea"
        name="commentTextarea"
        rows={4}
        cols={50}
        value={value}
        placeholder="댓글 작성하기"
        onChange={onChange}
      />
      <div className={cx('commentTextarea-button')}>
        {isEdit && (
          <Button size="small" theme="secondary" onClick={onCancel}>
            취소
          </Button>
        )}
        <Button
          disabled={disabled}
          size="small"
          theme="secondary"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
