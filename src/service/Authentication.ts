import { useAppState, useAuth } from '../context';

import { AxiosError } from 'axios';

import { user } from '../entities';
import UserCache from '../cache/userCache';
import AuthenticationAPI from '../api/Authentication';
import { useMutationReq } from '../hooks/useRequest';
import AppDataCache from '../cache/appData';

interface authDTO {
  name: string;
  password: string;
}
interface registerDTO {
  name: string;
  email: string;
  password: string;
  co_password: string;
}
class AuthenticationService {
  public static useLogin() {
    const { setUser, setToken } = useAuth();
    const { setIsInitialized } = useAppState();
    const { mutate, ...rest } = useMutationReq({
      queryKey: 'useLogin',
      request: AuthenticationAPI.login,
      onSuccess: ({ data }) => {
        UserCache.clearUserData();
        const loggedInUser = data.user;
        const token = data.token;

        setUser(loggedInUser);
        setToken(token);
        UserCache.storeUserData(loggedInUser, token);
        setIsInitialized(true);
        AppDataCache.storeAppData({ isInitialized: true });
      },
      onError: (err: AxiosError) => console.log('onError', err),
    });

    const onLogin = async (data: authDTO) => {
      mutate({
        name: data.name,
        password: data.password,
      });
    };

    return { onLogin, ...rest };
  }
  public static useVerifyAccount() {
    const { setUser, setToken } = useAuth();
    const { setIsInitialized } = useAppState();
    return useMutationReq({
      queryKey: 'useverify',
      request: AuthenticationAPI.verify,
      onSuccess: ({ data }) => {
        UserCache.clearUserData();
        const isverified = data.verified;
        if (isverified) {
          const loggedInUser = data.user;
          const token = data.token;
          setUser(loggedInUser);
          setToken(token);
          UserCache.storeUserData(loggedInUser, token);
          setIsInitialized(true);
          AppDataCache.storeAppData({ isInitialized: true });
        }
      },
      onError: (err: AxiosError) => console.log('onError', err),
    });
  }
  public static useReSendPin() {
    const { token } = useAuth();

    return useMutationReq({
      queryKey: 'resendToken',
      request: AuthenticationAPI.re_send_pin,
      onSuccess: ({ data }) => {},
      onError: (err: AxiosError) => console.log('onError', err),
    });
  }
  public static register() {
    const { setUser, setToken } = useAuth();
    const { setIsInitialized } = useAppState();
    const { mutate, ...rest } = useMutationReq({
      queryKey: 'register',
      request: AuthenticationAPI.register,
      onSuccess: ({ data }) => {
        console.log(
          '🚀 ~ file: Authentication.ts:64 ~ AuthenticationService ~ register ~ data:',
          data
        );
        const newUser = data.user;
        const token = data.token;

        setUser(newUser);
        setToken(token);
        UserCache.storeUserData(newUser, token);
        setIsInitialized(true);
        AppDataCache.storeAppData({ isInitialized: true });
      },
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });

    const onRegister = async (data: registerDTO) => {
      mutate({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.co_password,
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
