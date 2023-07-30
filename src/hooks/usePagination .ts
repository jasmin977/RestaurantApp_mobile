import { useState, useEffect } from 'react';
import { IUseMutationReq } from './useRequest';
import usePaginationPrimitive from './usePaginationPrimitive';

const usePagination = (service: () => IUseMutationReq) => {
  const [data, setData] = useState<any[]>([]);

  return usePaginationPrimitive(service, data, setData);
};

export default usePagination;
