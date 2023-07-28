import { useState, useEffect } from 'react';
import axios from 'axios';
import { IUseMutationReq, IUseQueryReq } from './useRequest';

interface ILazyLoading<T> {
  initialLimit: number;
  fetchDataAction: IUseQueryReq | IUseMutationReq;
  sortField: keyof T; // The sorting field must match the keys of the generic type T
}

const useLazyLoading = <T extends Record<string, any>>({
  initialLimit,
  fetchDataAction,
  sortField,
}: ILazyLoading<T>) => {
  const [documentData, setDocumentData] = useState<T[]>([]);
  const [limit, setLimit] = useState(initialLimit);

  const [lastVisible, setLastVisible] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      setLoading(true);
      console.log('Retrieving Data');

      const { data, isLoading, error } = fetchDataAction;

      const sortedData = data.data.sort((a: T, b: T) => a[sortField] - b[sortField]);
      const initialData = sortedData.slice(0, limit);

      setDocumentData(initialData);
      setLastVisible(initialData[initialData.length - 1]?.[sortField] ?? null);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveMore = async () => {
    try {
      setRefreshing(true);
      console.log('Retrieving additional Data');

      const { data, isLoading, error } = fetchDataAction;

      const sortedData = data.data.sort((a: T, b: T) => a[sortField] - b[sortField]);
      if (lastVisible) {
        const additionalData = sortedData.filter((item: T) => item[sortField] > lastVisible);
        const slicedData = additionalData.slice(0, limit);

        setLastVisible(slicedData[slicedData.length - 1]?.[sortField] ?? null);
        setDocumentData(prevData => [...prevData, ...slicedData]);
      }

      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    documentData,
    loading,
    refreshing,
    retrieveMore,
  };
};

export default useLazyLoading;
