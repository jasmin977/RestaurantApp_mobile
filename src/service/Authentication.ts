import { useAppState, useAuth } from '../context';

import { AxiosError } from 'axios';

import { user } from '../entities';
import UserCache from '../cache/userCache';
import AuthenticationAPI from '../api/Authentication';
import { useMutationReq } from '../hooks/useRequest';
import AppDataCache from '../cache/appData';

class AuthenticationService {
  public static useLogin() {
    const { setUser } = useAuth();
    const { setIsInitialized } = useAppState();
    const { mutate, ...rest } = useMutationReq({
      queryKey: 'useLogin',
      request: AuthenticationAPI.login,
      onSuccess: ({ data }) => {
        const loggedInUser = data[0];
        console.log(
          '🚀 ~ file: Authentication.ts:20 ~ AuthenticationService ~ useLogin ~ data:',
          data
        );

        setUser(loggedInUser);
        UserCache.storeUserData(loggedInUser);
        setIsInitialized(true);
        AppDataCache.storeAppData({ isInitialized: true });
      },
      onError: (err: AxiosError) => console.log('onError', err),
    });

    const onLogin = async (data: user) => {
      mutate({
        username: data.username,
        password: data.password,
      });
    };

    return { onLogin, ...rest };
  }
  public static register() {
    const { setUser } = useAuth();
    const { setIsInitialized } = useAppState();
    const { mutate, ...rest } = useMutationReq({
      queryKey: 'register',
      request: AuthenticationAPI.register,
      onSuccess: ({ data }) => {
        const newUser = data[0];
        setUser(newUser);
        UserCache.storeUserData(newUser);
        setIsInitialized(true);
        AppDataCache.storeAppData({ isInitialized: true });
      },
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });

    const onRegister = async (data: user) => {
      mutate({
        username: data.username,
        email: data.email,
        password: data.password,
      });
    };

    return { onRegister, ...rest };
  }
  public static logout() {
    const { setUser } = useAuth();
    UserCache.clearUserData();
    setUser(null);
  }
}

export default AuthenticationService;
