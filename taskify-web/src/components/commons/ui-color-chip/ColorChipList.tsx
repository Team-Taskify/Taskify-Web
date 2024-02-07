import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import ColorChip, {
  ColorChipColor,
} from '@/components/commons/ui-color-chip/ColorChip';
import styles from './ColorChipList.module.scss';

const cx = classNames.bind(styles); // styles 객체를 바인딩하여 CSS 클래스를 동적으로 생성하는 함수를 만듭니다.

type ColorChipListProps = {
  selectedColor: ColorChipColor;
  onSelect: Dispatch<SetStateAction<ColorChipColor>>;
  isModal?: boolean;
};

/** 컬러칩 리스트입니다.
 * @props selectedColor : state로, ColorChipColor의 hex 형식 문자열이여야합니다.
 * @props onSelect : setState로, selectedColor를 설정하는 set함수를 넣어주세요.
 */
export default function ColorChipList({
  selectedColor,
  onSelect,
  isModal = false,
}: ColorChipListProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const colorList: ColorChipColor[] = [
    '#7AC555',
    '#760DDE',
    '#FFA500',
    '#76A5EA',
    '#E876EA',
  ];

  /** window사이즈가 모바일 환경이면 isMobile true로 */
  useEffect(() => {
    const observeResize = () => {
      if (window.innerWidth > 767) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };
    window.addEventListener('resize', observeResize);

    return () => window.removeEventListener('resize', observeResize);
  }, []);

  return (
    <div className={cx('container', { mobile: !isModal })}>
      {!(isModal === false && isMobile === true) &&
        colorList.map((color) => (
          <ColorChip
            key={color}
            color={color}
            colorList={colorList}
            onClick={onSelect}
            isMobile={!isModal && isMobile}
            isChoice={selectedColor === color}
          />
        ))}
      {isModal === false && isMobile === true && (
        <ColorChip
          color={selectedColor}
          colorList={colorList}
          onClick={onSelect}
          isMobile={!isModal && isMobile}
          isChoice
        />
      )}
    </div>
  );
}
