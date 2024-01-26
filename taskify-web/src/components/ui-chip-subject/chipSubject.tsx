import React from 'react';
import cx from 'classnames/bind';
import styles from './ChipSubject.module.scss';

const localCx = cx.bind(styles);

interface ChipProps {
  label: string;
  onClick: () => void;
}

const ChipSubject: React.FC<ChipProps> = ({ label, onClick }) => {
  return (
    <div className={localCx('chip')} onClick={onClick} data-label={label}>
      {label}
    </div>
  );
};

export default ChipSubject;
