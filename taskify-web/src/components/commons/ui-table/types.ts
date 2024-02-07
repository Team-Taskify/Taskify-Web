// 각 컬럼의 메타 데이터 타입
export type TableColumn<Row> = {
  key: keyof Row;
  title: string;
  visible: boolean;
};

export type TableConfig<Row> = TableColumn<Row>[];
