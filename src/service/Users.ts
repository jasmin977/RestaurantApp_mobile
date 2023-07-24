import { AxiosError } from 'axios';
import { useQueryReq } from '../hooks/useRequest';
import RestaurantsAPI from '../api/RestaurantsAPI';
import UserAPI from '../api/UserAPI';

class UserService {
  public static useFetchUsers() {
    return useQueryReq({
      queryKey: 'useFetchUsers',
      request: () => UserAPI.getUsers(),
    });
  }
  public static useFetchUserByID(id: number) {
    return useQueryReq({
      queryKey: `useFetchUserByID`,
      request: () => UserAPI.getUserById(id),
    });
  }
}

export default UserService;
