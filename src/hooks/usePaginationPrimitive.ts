import { useState, useEffect } from 'react';
import { IUseMutationReq } from './useRequest';

// Define the generic type T
type DataType<T> = T[];

const usePaginationPrimitive = <T>(
  service: () => IUseMutationReq,
  data: DataType<T>,
  setData: (data: DataType<T>) => void
) => {
  const { data: res, isLoading, mutate } = service();
  const [page, setPage] = useState(1);
  const [noMoreData, setNoMoredata] = useState(false);
  useEffect(() => {
    if (res?.data) {
      const loadedData = res.data as DataType<T>;
      if (loadedData.length == 0) {
        setNoMoredata(true);
      } else {
        const newData = [...data, ...loadedData];
        console.log(
          '🚀 ~ file: usePaginationPrimitive.ts:18 ~ useEffect ~ newData:',
          newData.length,
          loadedData.length,
          data.length
        );

        setData(newData);
      }
    }
  }, [res]);

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = () => {
    const reviewProp = { page: page, limit: 5 };
    mutate(reviewProp);
    setPage(v => v + 1);
  };

  return { loadPage, data, noMoreData, isLoading };
};

export default usePaginationPrimitive;
