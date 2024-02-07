import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { axiosInstance } from '@/lib/api/axiosInstance';
import {
  SignInForm,
  UserData,
  SignUpForm,
  ChangeProfileForm,
  ChangePasswordForm,
} from '@/types/auth';

/** @type AuthContext에 필요한 타입 선언 */
type AuthContextType = {
  user: UserData | null;
  isPending: boolean;
  login: ({ email, password }: SignInForm) => Promise<void>;
  signup: ({ email, nickname, password }: SignUpForm) => Promise<void>;
  updateMe: ({ nickname, image }: ChangeProfileForm) => Promise<void>;
  changePassword: ({
    password,
    newPassword,
  }: ChangePasswordForm) => Promise<void>;
  error: AxiosError | null;
  success: boolean;
};

/**  createContext 초기값 지정 */
const AuthContext = createContext<AuthContextType>({
  user: null,
  isPending: true,
  login: async () => {},
  signup: async () => {},
  updateMe: async () => {},
  changePassword: async () => {},
  error: null,
  success: false,
});

type AuthProviderProps = { children: ReactNode };

/**
 * Context.Provider를 쉽게 사용하기 위해 만든 Provider 컴포넌트
 * @props children : html요소가 들어가는데 이미 _app에 적용되어있음.
 * @function login : 로그인 동작 함수
 * @function signup : 회원가입 요청 함수
 * @function updateMe : 프로필 및 닉네임 변경 요청 함수
 * @function changePassword : 비밀번호 변경 요청 함수
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
  const [axiosSuccess, setAxiosSuccess] = useState<boolean>(false);

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

  /** 유저 프로필 이미지, 닉네임을 수정하는 함수입니다. */
  const updateMe = useCallback(
    async ({ nickname, image }: ChangeProfileForm) => {
      if (image) {
        try {
          const res = await axiosInstance.post(
            'users/me/image',
            {
              image,
            },
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            },
          );
          const { data } = res;
          await axiosInstance.put('users/me', {
            nickname,
            profileImageUrl: data.profileImageUrl,
          });
          getMe();
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setAxiosError(error);
          }
        }
      } else {
        try {
          await axiosInstance.put('users/me', {
            nickname,
            profileImageUrl: value.user?.profileImageUrl,
          });
          getMe();
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setAxiosError(error);
          }
        }
      }
    },
    [value.user?.profileImageUrl],
  );

  /** 비밀번호를 변경하는 함수입니다. */
  const changePassword = useCallback(
    async ({ password, newPassword }: ChangePasswordForm) => {
      try {
        setAxiosError(null);
        await axiosInstance.put('auth/password', { password, newPassword });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setAxiosError(error);
        }
      }
    },
    [],
  );

  /** useCallBack 쓰라고 경고메세지 뜨는데 나중에 리팩토링 기간 주어지면 최적화 해봐도 좋을 것 같습니다. */
  const login = useCallback(
    async ({ email, password }: SignInForm) => {
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
    },
    [router],
  );

  /** 회원가입 시도하고, 성공시 success true로 반환 */
  const signup = useCallback(
    async ({ email, nickname, password }: SignUpForm) => {
      try {
        setAxiosError(null);
        setAxiosSuccess(false);
        await axiosInstance.post('users', {
          email,
          nickname,
          password,
        });
        setAxiosSuccess(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setAxiosError(error);
        }
      }
    },
    [],
  );

  useEffect(() => {
    getMe();
  }, []);

  const memoizedValue = useMemo(
    () => ({
      user: value.user,
      isPending: value.isPending,
      login,
      signup,
      updateMe,
      changePassword,
      error: axiosError,
      success: axiosSuccess,
    }),
    [
      value.user,
      value.isPending,
      login,
      signup,
      updateMe,
      changePassword,
      axiosError,
      axiosSuccess,
    ],
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
