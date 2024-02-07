import { useCallback } from 'react';
import { Members } from '@/types/dashboard';
import { axiosInstance } from '../api/axiosInstance';
import { useAsync } from './useAsync';

export const useGetMembers = (boardId: string) => {
  const getUser = useCallback(
    () =>
      axiosInstance.get<Members>(
        `members?page=1&size=20&dashboardId=${boardId}`,
      ),
    [boardId],
  );
  const { loading, error, data } = useAsync({
    asyncFunction: getUser,
    reload: !!boardId,
  });

  return { loading, error, membersData: data };
};
