import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import CustomRowWithData, { DefaultRowProps } from './CustomRowWithData';
import styles from './DefaultTable.module.scss';

const cx = classNames.bind(styles);

export type ColumnKey<Row> = {
  [P in keyof Row]: [string, boolean];
};

type DefaultTableProps<P extends DefaultRowProps> = {
  tableTitle: string;
  RowComponent: React.ComponentType<P>;
  rowData: P[];
  columnNames: ColumnKey<P>;
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
            {Object.entries<[string, boolean]>(columnNames).map(
              ([key, value]) => {
                const [columnName, isVisible] = value;
                if (isVisible) {
                  return <th key={key}>{columnName}</th>;
                }
                return <th key={key} aria-label={columnName} />;
              },
            )}
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
