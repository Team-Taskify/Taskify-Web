/* eslint-disable */
import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

type UseAsyncParams<T> = {
  asyncFunction: () => Promise<AxiosResponse<T>>;
  isManual?: boolean;
  reload?: boolean;
};

export const useAsync = <T>({
  asyncFunction,
  isManual = false,
  reload = true,
}: UseAsyncParams<T>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | any>(null);
  const [data, setData] = useState<null | T>(null);

  //   비동기 호출
  const execute = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await asyncFunction();
      setData(response?.data ?? null);
      return response;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reload && !isManual) {
      execute();
    }
  }, [reload, isManual]);

  //   로딩, 에러, 데이터 반환
  return { execute, loading, error, data };
};
