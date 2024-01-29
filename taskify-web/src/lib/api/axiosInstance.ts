import axios, {
  AxiosHeaders,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';

/**
 * @alert 해당 인스턴스를 사용할 때 첫번째 path는 /를 사용하지 않습니다.
 * '/dashboards/@'라고 예를 들자면 'dashboards/@' 식으로 사용
 */
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/2-11/',
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
      (config.headers as AxiosHeaders).set(
        'Authorization',
        `Bearer ${accessToken}`,
      );
    }
    return config;
  },
);
