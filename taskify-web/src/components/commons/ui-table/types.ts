import { MouseEventHandler } from 'react';

// 각 컬럼의 메타 데이터 타입
export type TableColumn<Row> = {
  key: keyof Row;
  title: string;
  visible: boolean;
};

export type TableConfig<Row> = TableColumn<Row>[];

export type PaginationConfig = {
  type: 'pagination' | 'infiniteScroll' | 'none';
  pageSize?: number;
  leftClick?: MouseEventHandler<HTMLButtonElement>;
  rightClick?: MouseEventHandler<HTMLButtonElement>;
};
