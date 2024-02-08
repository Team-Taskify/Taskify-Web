import { ReactNode, createContext, useState } from 'react';
import { PaginationConfig } from '@/components/commons/ui-table/types';

const PaginationConfigContext = createContext<PaginationConfig | undefined>(
  undefined,
);

type PaginationConfigProviderProps = {
  children: ReactNode;
};

export default function PaginationConfigProvider({
  children,
}: PaginationConfigProviderProps) {
  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    type: 'none',
  });

  const setPagingTypePagination = (
    eachPageSize: number,
    totalRowCount: number,
    getBeforePage: () => void,
    getAfterPage: () => void,
    currentRowCount?: number,
  ) => {
    if (eachPageSize < 1) {
      throw Error('한 페이지의 크기는 1 이상이어야 합니다');
    }

    const totalPages =
      totalRowCount > 0 ? Math.ceil(totalRowCount / eachPageSize) : 1;

    if (paginationConfig.type === 'infiniteScroll') {
      const currentPage =
        currentRowCount !== undefined && currentRowCount > 0
          ? Math.ceil(currentRowCount / eachPageSize)
          : 1;

      setPaginationConfig({
        type: 'pagination',
        pageSize: eachPageSize,
        currentPage,
        totalPages,
        getBeforePage,
        getAfterPage,
      });
    }

    if (paginationConfig.type === 'none') {
      setPaginationConfig({
        type: 'pagination',
        pageSize: eachPageSize,
        currentPage: 1,
        totalPages,
        getBeforePage,
        getAfterPage,
      });
    }
  };

  const setPagingTypeInfiniteScroll = (
    eachScrollSize: number,
    getAfterPage: () => void,
    cursorId: number,
  ) => {
    if (eachScrollSize < 1) {
      throw Error('한 스크롤단위의 크기는 1 이상이어야 합니다');
    }

    setPaginationConfig({
      type: 'infiniteScroll',
      pageSize: eachScrollSize,
      getAfterPage,
      cursorId,
    });
  };

  const setPagingTypeNone = () => {
    setPaginationConfig({ type: 'none' });
  };

  <PaginationConfigContext.Provider value={paginationConfig}>
    {children}
  </PaginationConfigContext.Provider>;
}
