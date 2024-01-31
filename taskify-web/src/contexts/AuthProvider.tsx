import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { axiosInstance } from '@/lib/api/axiosInstance';
import { SignInForm, UserData } from '@/types/auth';

/** @type AuthContext에 필요한 타입 선언 */
type AuthContextType = {
  user: UserData | null;
  isPending: boolean;
  login: ({ email, password }: SignInForm) => Promise<void>;
  error: AxiosError | null;
};

/**  createContext 초기값 지정 */
const AuthContext = createContext<AuthContextType>({
  user: null,
  isPending: true,
  login: async () => {},
  error: null,
});

type AuthProviderProps = { children: ReactNode };

/**
 * Context.Provider를 쉽게 사용하기 위해 만든 Provider 컴포넌트
 * @props children : html요소가 들어가는데 이미 _app에 적용되어있음.
 * @function login : 로그인 동작 함수
 * @TODO 대시보드 데이터 가져오기
 * @TODO 회원가입 함수
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [value, setValue] = useState<{
    user: UserData | null;
    isPending: boolean;
  }>({
    user: null,
    isPending: true,
  });
  const [axiosError, setAxiosError] = useState<AxiosError | null>(null);

  const router = useRouter();

  /**
   * 유저 정보를 가져오는 기능입니다. 기본적으로 매 로딩마다 실행되며, 없을때는 null 그대로 유지됩니다
   * */
  const getMe = async () => {
    setValue((prevValue) => ({ ...prevValue, isPending: true }));
    let nextUser: UserData | null = null;
    try {
      setAxiosError(null);
      const res = await axiosInstance.get('users/me');
      nextUser = res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAxiosError(error);
      }
    } finally {
      setValue((prevValue) => ({
        ...prevValue,
        user: nextUser,
        isPending: false,
      }));
    }
  };

  /** useCallBack 쓰라고 경고메세지 뜨는데 나중에 리팩토링 기간 주어지면 최적화 해봐도 좋을 것 같습니다. */
  const login = async ({ email, password }: SignInForm) => {
    try {
      setAxiosError(null);
      const res = await axiosInstance.post('auth/login', { email, password });
      sessionStorage.setItem('accessToken', res.data.accessToken);
      await getMe();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAxiosError(error);
      }
      return;
    }
    router.push('/mydashboard');
  };

  useEffect(() => {
    getMe();
  }, []);

  const memoizedValue = useMemo(
    () => ({
      user: value.user,
      isPending: value.isPending,
      login,
      error: axiosError,
    }),
    [value.user, value.isPending, login, axiosError],
  );
  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Context를 잘 사용하기 위해 만든 커스텀 훅
 * 커스텀 훅 모아놓는 곳에 나중에 옮겨도 무방할 것 같습니다.
 * @params required : 로그인이 필요한 페이지일 때 true로 지정해놓으면 자동으로 signin 페이지로 넘어감.
 */
export function useAuth(required: boolean = false) {
  const context = useContext(AuthContext);
  const router = useRouter();
  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.');
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      router.push('/signin');
    }
  }, [context.user, context.isPending, required, router]);

  return context;
}