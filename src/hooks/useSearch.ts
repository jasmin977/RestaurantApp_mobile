import { useState, useEffect } from 'react';
import { IUseQueryReq } from './useRequest';

type DataType<T> = T[];

const useSearch = <T>(service: () => IUseQueryReq, sortBy: keyof T) => {
  const { data: res, isLoading, error } = service();
  const [searchText, setSearchText] = useState('');
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchResults, setSearchResults] = useState<DataType<T>>([]);

  useEffect(() => {
    if (res?.data) {
      const loadedData = res.data as DataType<T>;
      setSearchResults(loadedData);
    }
  }, []);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
    setIsSearchClicked(true);
    const filtered = res?.data.filter((item: T) => {
      const propertyValue = item[sortBy];
      if (typeof propertyValue === 'string') {
        return propertyValue.toLowerCase().includes(searchText.toLowerCase());
      }
      return false;
    });
    setSearchResults(filtered || []);
  };
  const cancelSearch = () => {
    if (res?.data) {
      const loadedData = res.data as DataType<T>;
      setSearchResults(loadedData);
    }
    setSearchText('');
  };

  return {
    searchText,
    setSearchText,
    searchResults,
    handleSearch,
    error,
    isLoading,
    isSearchClicked,
    setIsSearchClicked,
    cancelSearch,
  };
};

export default useSearch;
