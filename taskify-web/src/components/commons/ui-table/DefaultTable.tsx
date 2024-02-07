import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import CustomRowWithData, { DefaultRowProps } from './CustomRowWithData';
import styles from './DefaultTable.module.scss';
import { PaginationConfig, TableConfig } from './types';
import PaginationButtonContainer from '../ui-pagination/PaginationButtonContainer';

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
    leftClick: () => {},
    rightClick: () => {},
  },
  columnNames,
  RowComponent,
  rowData = [],
  children,
}: DefaultTableProps<P>) {
  return (
    <div className={cx('default-table')}>
      {paginationConfig.type === 'pagination' ? (
        <div className={cx('default-table__pagination-button-container')}>
          <span
            className={cx(
              'default-table__pagination-button-container_page-info',
            )}
          >
            * 페이지 중 *
          </span>
          <PaginationButtonContainer
            leftClick={paginationConfig.leftClick!}
            rightClick={paginationConfig.rightClick!}
          />
        </div>
      ) : null}
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
            <CustomRowWithData<P>
              key={eachData.id}
              RowComponent={RowComponent}
              rowData={eachData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
