import { useRouter } from 'next/router';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AxiosError } from 'axios';
import { Members } from '@/types/dashboard';
import { axiosInstance } from '@/lib/api/axiosInstance';

type MemberProviderType = {
  membersData: {
    data: Members | null;
    error: AxiosError<unknown> | null;
  };
  paginationedMembersData: {
    data: Members | null;
    error: AxiosError<unknown> | null;
  };
  getMembers: () => Promise<void>;
  getPaginationedMembers: (page: number) => Promise<void>;
  error: AxiosError | null;
  boardId: string | string[] | undefined;
};

const MemberContext = createContext<MemberProviderType>({
  membersData: {
    data: null,
    error: null,
  },
  paginationedMembersData: {
    data: null,
    error: null,
  },
  getMembers: async () => {},
  getPaginationedMembers: async () => {},
  error: null,
  boardId: undefined,
});

type MemberProviderProps = {
  children: ReactNode;
};

export function MemberProvider({ children }: MemberProviderProps) {
  const [membersData, setMembersData] = useState<{
    data: Members | null;
    error: AxiosError | null;
  }>({
    data: null,
    error: null,
  });
  const [paginationedMembersData, setPaginationedMembersData] = useState<{
    data: Members | null;
    error: AxiosError | null;
  }>({
    data: null,
    error: null,
  });

  const [axiosError, setAxiosError] = useState<AxiosError | null>(null);

  const router = useRouter();
  const { boardId } = router.query;

  const getMembers = useCallback(async () => {
    try {
      setAxiosError(null);
      setMembersData((prevValue) => ({ ...prevValue, error: null }));
      const res = await axiosInstance.get(
        `members?page=1&size=4&dashboardId=${boardId}`,
      );
      setMembersData((prevValue) => ({ ...prevValue, data: res.data }));
    } catch {
      setAxiosError(axiosError);
      setMembersData((prevValue) => ({ ...prevValue, error: axiosError }));
    }
  }, [axiosError, boardId]);

  const getPaginationedMembers = useCallback(
    async (page: number = 1) => {
      try {
        setAxiosError(null);
        setPaginationedMembersData((prevValue) => ({
          ...prevValue,
          error: null,
        }));
        const res = await axiosInstance.get(
          `members?page=${page}&size=4&dashboardId=${boardId}`,
        );
        setPaginationedMembersData((prevValue) => ({
          ...prevValue,
          data: res.data,
        }));
      } catch {
        setAxiosError(axiosError);
        setPaginationedMembersData((prevValue) => ({
          ...prevValue,
          error: axiosError,
        }));
      }
    },
    [axiosError, boardId],
  );

  useEffect(() => {
    if (router.isReady) {
      if (boardId) {
        getPaginationedMembers();
        getMembers();
      }
    }
  }, [router.isReady]);

  const memoizedValue = useMemo(
    () => ({
      membersData,
      paginationedMembersData,
      getMembers,
      getPaginationedMembers,
      error: axiosError,
      boardId,
    }),
    [
      membersData,
      paginationedMembersData,
      getMembers,
      getPaginationedMembers,
      axiosError,
      boardId,
    ],
  );

  return (
    <MemberContext.Provider value={memoizedValue}>
      {children}
    </MemberContext.Provider>
  );
}

export function useMembers() {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('반드시 MemberProvider 안에서 사용해야 합니다.');
  }

  return context;
}