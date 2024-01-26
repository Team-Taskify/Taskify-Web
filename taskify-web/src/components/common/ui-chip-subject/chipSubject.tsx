import React from 'react';
import cx from 'classnames/bind';
import styles from './ChipSubject.module.scss';

const localCx = cx.bind(styles);

interface ChipProps {
  label: string;
}

function ChipSubject({ label }: ChipProps) {
  return (
    <div className={localCx('chip')} data-label={label}>
      {label}
    </div>
  );
}

export default ChipSubject;
