import { UseMutateFunction, useMutation, useQuery } from 'react-query';
export interface IUseMutationReq {
  data: any;
  isLoading: boolean;
  error: any;
  mutate: UseMutateFunction<any, any, any, any>;
}
export interface IUseQueryReq {
  data: any;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => Promise<any>;
  error: any;
}
interface IUseReqeustParams {
  queryKey: string;
  request: (...params: any) => Promise<any>;
  onSuccess?: (...params: any) => void;
  onError?: (...params: any) => void;
}

export function useMutationReq({
  queryKey,
  request,
  onSuccess,
  onError,
}: IUseReqeustParams): IUseMutationReq {
  const { data, isLoading, error, mutate } = useMutation({
    mutationKey: queryKey,
    mutationFn: request,
    onSuccess,
    onError,
  });
  return { data, isLoading, error, mutate };
}
export function useQueryReq({
  queryKey,
  request,
  onSuccess,
  onError,
}: IUseReqeustParams): IUseQueryReq {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey,
    queryFn: request,
    onSuccess,
    onError,
  });
  return { data, isLoading, isFetching, refetch, error };
}
