import { AxiosError, AxiosResponse } from 'axios';

import { useMutationReq } from '../hooks/useRequest';
import DirectionAPI from '../api/DirectionApi';

export class DirectionService {
  public static getDirection() {
    return useMutationReq({
      queryKey: 'getDirection',
      request: DirectionAPI.getDirection,
      onError: (err: AxiosError) => console.log('onError: ', err.response?.data),
      onSuccess: (data: AxiosResponse) => console.log('onSuccess: ', data.status),
    });
  }
}
