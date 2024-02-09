import { useEffect } from 'react';
import { usePaginationConfig } from '@/contexts/PaginationProvider';
import { useAsync } from './useAsync';
import { PaginationType } from '@/components/commons/ui-table/types';

export default function usePaginationData<T>(
  fetchDataFunction: (
    type: PaginationType,
    pageSize?: number,
    cursorId?: number | string,
    currentPage?: number,
  ) => Promise<string>,
) {
  const { type, pageSize, cursorId, currentPage } = usePaginationConfig();

  const {
    execute,
    loading,
    error,
    data: fetchData,
  } = useAsync<T>({
    asyncFunction: () => {
      return fetchDataFunction(type, pageSize, cursorId, currentPage);
    },
  });

  useEffect(() => {
    execute();
  }, [type, pageSize, cursorId, currentPage, execute]);

  return { loading, error, fetchData };
}
