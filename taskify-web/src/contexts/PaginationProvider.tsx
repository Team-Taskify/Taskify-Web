import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { PaginationConfig } from '@/components/commons/ui-table/types';

// PaginationConfig와 함께 추가 함수들을 포함하는 컨텍스트 값의 타입 정의
type PaginationConfigContextType = PaginationConfig & {
  setPagingTypePagination: (
    eachPageSize: number,
    totalRowCount: number,
    getBeforePage: () => void,
    getAfterPage: () => void,
    currentRowCount?: number,
  ) => void;
  setPagingTypeInfiniteScroll: (
    eachScrollSize: number,
    getAfterPage: () => void,
    cursorId: number,
  ) => void;
  setPagingTypeNone: () => void;
};

// createContext에 기본값으로 null 대신 적절한 초기값이나 타입 어설션을 사용
const PaginationConfigContext = createContext<
  PaginationConfigContextType | undefined
>(undefined);

type PaginationConfigProviderProps = {
  children: ReactNode;
};

export default function PaginationConfigProvider({
  children,
}: PaginationConfigProviderProps) {
  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    type: 'none',
  });

  const setPagingTypePagination = useCallback(
    (
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
    },
    [paginationConfig.type],
  );

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

  const contextValue = useMemo(
    () => ({
      ...paginationConfig,
      setPagingTypePagination,
      setPagingTypeInfiniteScroll,
      setPagingTypeNone,
    }),
    [paginationConfig, setPagingTypePagination],
  );

  return (
    <PaginationConfigContext.Provider value={contextValue}>
      {children}
    </PaginationConfigContext.Provider>
  );
}
