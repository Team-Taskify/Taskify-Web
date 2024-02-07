import React, { useState } from 'react';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';
import CalendarIcon from './CalendarIcon';

dayjs.extend(customParseFormat);

const cx = classNames.bind(styles);

interface CalendarInputProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

export default function CalendarInput({
  value,
  onChange,
  placeholder = '날짜를 입력해주세요',
}: CalendarInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null,
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    if (date && onChange) {
      onChange(dayjs(date).format('YYYY-MM-DD HH:mm'));
    }
  };

  return (
    <div className={cx('datepicker-container')}>
      <DatePicker
        showIcon
        locale={ko}
        selected={selectedDate}
        onChange={(date: Date | null) => handleDateChange(date)}
        placeholderText={placeholder}
        dateFormat="yyyy-MM-dd HH:mm"
        showTimeInput
        timeInputLabel="Time:"
        className={cx(['datepicker'])}
        dayClassName={(date) =>
          selectedDate &&
          date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth()
            ? 'custom-day selected-day'
            : 'custom-day'
        }
        icon="fa fa-calendar"
      />
      <CalendarIcon
        className={cx('calendar-icon')}
        fill={selectedDate ? '#333236' : '#9FA6B2'}
      />
    </div>
  );
}
