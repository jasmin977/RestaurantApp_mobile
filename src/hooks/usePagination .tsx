import { useState, useEffect } from 'react';
import { IUseMutationReq } from './useRequest';

const usePagination = (service: () => IUseMutationReq) => {
  const { data: res, mutate } = service();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (res?.data) {
      setData(prevData => [...prevData, ...res.data]);
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

  return { loadPage, data, page };
};

export default usePagination;
