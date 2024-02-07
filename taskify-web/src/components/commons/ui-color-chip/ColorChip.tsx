import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ColorChip.module.scss';
import Choice from './Choice.svg';

const cx = classNames.bind(styles);

/** hex값으로 변경 */
export type ColorChipColor =
  | '#7AC555'
  | '#760DDE'
  | '#FFA500'
  | '#76A5EA'
  | '#E876EA';

type ColorChipProps = {
  isChoice?: boolean;
  color: ColorChipColor;
  onClick: (color: ColorChipColor) => void;
  isMobile: boolean;
  colorList: ColorChipColor[];
};

/**
 * @props isChoice : 선택 여부
 * @props color: ColorChipColor
 * @props onClick : 클릭 이벤트
 * @props isMobile: 모바일 환경인지 확인
 * @props colorList: Colorchip 리스트 */
export default function ColorChip({
  isChoice = false,
  color,
  onClick,
  isMobile,
  colorList,
}: ColorChipProps) {
  /** 배열로 전달받은 컬러 전달용 */
  const [index, setIndex] = useState<number>(0);

  /** 모바일 환경이면 순서대로 넘어가도록 */
  function onClickHandler() {
    if (isMobile) {
      setIndex((index + 1) % 5);
      onClick(colorList[index]);
    } else {
      onClick(color);
    }
  }

  return (
    <button
      style={{ backgroundColor: color }}
      className={cx('container')}
      onClick={onClickHandler}
      type="button"
    >
      {isChoice && <Choice className={cx('choice')} />}
    </button>
  );
}
