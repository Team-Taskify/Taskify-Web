import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './ChangeDashBoardForm.module.scss';
import Button from '@/components/commons/ui-button/Button';
import ColorChipList from '@/components/commons/ui-color-chip/ColorChipList';
import { ColorChipColor } from '@/components/commons/ui-color-chip/ColorChip';
import { Input } from '@/components/commons/ui-input/Input';
import { DashboardData } from '@/types/dashboard';
import { useDashBoard } from '@/contexts/DashBoardProvider';

const cx = classNames.bind(styles);

type ChangeDashBoardFormProps = {
  data: DashboardData | null;
};

/** 대시보드 수정 폼
 * @props data : 받아온 데이터
 * @props boardId : query로 가져온 값
 * @props reload : 대시보드 가져오는 훅의 execute 함수
 */
export default function ChangeDashBoardForm({
  data,
}: ChangeDashBoardFormProps) {
  const [selectedColor, setSelectedColor] = useState<ColorChipColor>('#7AC555');

  const { control, setValue, watch } = useForm({
    mode: 'onBlur',
  });

  const { updateDashBoard } = useDashBoard();

  useEffect(() => {
    if (data) {
      setValue('dashboardName', data.title);
    }
  }, [data]);

  const handleSubmit = async () => {
    updateDashBoard({ color: selectedColor, title: watch('dashboardName') });
  };

  return (
    <form className={cx('container')}>
      <div className={cx('header')}>
        <h1 className={cx('title')}>{data?.title || ''}</h1>
        <ColorChipList
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      </div>
      <div className={cx('formContainer')}>
        <label className={cx('inputContainer')}>
          대시보드 이름
          <Controller
            control={control}
            name="dashboardName"
            render={({ field }) => <Input {...field} isModal />}
          />
        </label>
        <div className={cx('buttonContainer')}>
          <Button
            disabled={!watch('dashboardName')}
            onClick={handleSubmit}
            size="medium"
            theme="primary"
          >
            변경
          </Button>
        </div>
      </div>
    </form>
  );
}
