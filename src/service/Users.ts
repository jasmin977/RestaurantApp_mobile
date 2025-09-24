import { AxiosError } from 'axios';
import { useMutationReq, useQueryReq } from '../hooks/useRequest';

import UserAPI from '../api/UserAPI';
import { useAuth, useFollowContext } from '../context';
import UserCache from '../cache/userCache';

class UserService {
  public static useFetchUsers(token: string | null) {
    return useQueryReq({
      queryKey: 'useFetchUsers',
      request: () => UserAPI.getUsers(token),
    });
  }
  public static useFetchUserByID(id?: number | string) {
    // const { setFollowers } = useFollowContext();
    const { user, token } = useAuth();
    const { setFollowings, setLikedRestaurants } = useFollowContext();
    const userId = (id || user?.id) as number | string;
    return useQueryReq({
      queryKey: `useFetchUserByID${userId}`,
      request: () => UserAPI.getUserById(userId, token),
      onSuccess: ({ data }) => {
        setFollowings(data.user.followings);
        setLikedRestaurants(data.user.liking);
      },
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
  }

  public static updateuser() {
    const { setUser, token } = useAuth();

    return useMutationReq({
      queryKey: 'updateuser',
      request: UserAPI.updateUser,
      onSuccess: ({ data }) => {
        setUser({
          avatar: data.user.avatar,
          bio: data.user.bio,
          datOfBirth: data.user.date_of_birth,
          email: data.user.email,
          gender: data.user.gender,
          id: data.user.id,
          name: data.user.name,
          phone: data.user.phone,
        });
        if (token) {
          UserCache.storeUserData(data.user, token);
        }
      },
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
  }

  public static followUser() {
    const { setFollowings } = useFollowContext();
    return useMutationReq({
      queryKey: 'useFollowUser',
      request: UserAPI.followUser,
      onSuccess: ({ data }) => {
        console.log('🚀 ~ file: Users.ts:54 ~ UserService ~ followUser ~ data:', data.user);
        setFollowings(prevFollowers => [...prevFollowers, data.user]);
      },
      onError: (err: AxiosError) => console.log('onError:useFollowUser', err.response?.data),
    });
  }
  public static unFollowUser() {
    const { followings, setFollowings } = useFollowContext();
    return useMutationReq({
      queryKey: 'unFollowUser',
      request: UserAPI.unfollowUser,
      onSuccess: ({ data }) => {
        const updatedFollowings = followings.filter(user => user.id != data.user.id);
        setFollowings(updatedFollowings);
      },
      onError: (err: AxiosError) => console.log('onError:useunFollowUser', err.response?.data),
    });
  }
}

export default UserService;
