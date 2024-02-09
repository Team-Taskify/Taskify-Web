import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PaginationConfig } from '@/components/commons/ui-table/types';

// PaginationConfig와 함께 추가 함수들을 포함하는 컨텍스트 값의 타입 정의
type PaginationConfigContextType = PaginationConfig & {
  setPaginationConfig: Dispatch<SetStateAction<PaginationConfig>>;
  setPagingTypePagination: (
    eachPageSize: number,
    totalRowCount: number,
    currentRowCount?: number,
  ) => void;
  setPagingTypeInfiniteScroll: (
    eachScrollSize: number,
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
    (eachPageSize: number, totalRowCount: number, currentRowCount?: number) => {
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
        });
      }

      if (paginationConfig.type === 'none') {
        setPaginationConfig({
          type: 'pagination',
          pageSize: eachPageSize,
          currentPage: 1,
          totalPages,
        });
      }
    },
    [paginationConfig.type],
  );

  const setPagingTypeInfiniteScroll = (
    eachScrollSize: number,
    cursorId: number,
  ) => {
    if (eachScrollSize < 1) {
      throw Error('한 스크롤단위의 크기는 1 이상이어야 합니다');
    }

    setPaginationConfig({
      type: 'infiniteScroll',
      pageSize: eachScrollSize,
      cursorId,
    });
  };

  const setPagingTypeNone = () => {
    setPaginationConfig({ type: 'none' });
  };

  const contextValue = useMemo(
    () => ({
      ...paginationConfig,
      setPaginationConfig,
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

export function usePaginationConfig(defaultValue?: PaginationConfig) {
  const paginationConfigContext = useContext(PaginationConfigContext);
  if (!paginationConfigContext) {
    throw Error('반드시 PaginationConfigProvider 내에서 사용해주세요');
  }

  const { setPaginationConfig, ...rest } = paginationConfigContext;

  useEffect(() => {
    if (defaultValue) {
      setPaginationConfig(defaultValue);
    }
  }, [defaultValue, setPaginationConfig]);

  return rest;
}
