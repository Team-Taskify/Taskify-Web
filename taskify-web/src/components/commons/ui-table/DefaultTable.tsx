import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import CustomRowWithData, { DefaultRowProps } from './CustomRowWithData';
import styles from './DefaultTable.module.scss';

const cx = classNames.bind(styles);

// 각 컬럼의 메타 데이터 타입
export type TableColumn<Row> = {
  key: keyof Row;
  title: string;
  visible: boolean;
};

export type TableConfig<Row> = TableColumn<Row>[];

type DefaultTableProps<P extends DefaultRowProps> = {
  tableTitle: string;
  RowComponent: React.ComponentType<P>;
  rowData: P[];
  columnNames: TableConfig<P>;
  children?: ReactNode;
};

export default function DefaultTable<P extends DefaultRowProps>({
  tableTitle,
  columnNames,
  RowComponent,
  rowData = [],
  children,
}: DefaultTableProps<P>) {
  return (
    <div className={cx('default-table')}>
      <h1 className={cx('default-table__title')}>{tableTitle}</h1>
      {children}
      <table className={cx('default-table__table')}>
        <thead className={cx('default-table__thead')}>
          <tr className={cx('default-table__thead_column')}>
            {columnNames.map((value) => {
              const { key, title, visible } = value;
              if (visible) {
                return <th key={key as string}>{title}</th>;
              }
              return <th key={key as string} aria-label={title} />;
            })}
          </tr>
        </thead>
        <tbody className={cx('default-table__tbody')}>
          {rowData?.map((eachData) => (
            <tr key={eachData.id} className={cx('default-table__tbody_row')}>
              <CustomRowWithData<P>
                RowComponent={RowComponent}
                rowData={eachData}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
