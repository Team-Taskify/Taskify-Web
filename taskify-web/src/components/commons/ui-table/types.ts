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
  currentPage?: number;
  totalPages?: number;
  cursorId?: number | string;
  getBeforePage?: MouseEventHandler<HTMLButtonElement>;
  getAfterPage?: MouseEventHandler<HTMLButtonElement>;
};
