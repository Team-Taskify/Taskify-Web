import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import CustomRowWithData, { DefaultRowProps } from './CustomRowWithData';
import styles from './DefaultTable.module.scss';
import { PaginationConfig, TableConfig } from './types';

const cx = classNames.bind(styles);

type DefaultTableProps<P extends DefaultRowProps> = {
  tableTitle: string;
  paginationConfig?: PaginationConfig;
  RowComponent: React.ComponentType<P>;
  rowData: P[];
  columnNames: TableConfig<P>;
  children?: ReactNode;
};

export default function DefaultTable<P extends DefaultRowProps>({
  tableTitle,
  paginationConfig = {
    type: 'none',
    pageSize: 5,
  },
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
