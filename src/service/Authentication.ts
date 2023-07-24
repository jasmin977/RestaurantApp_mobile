import { useAppState, useAuth } from '../context';

import { AxiosError } from 'axios';

import { user } from '../entities';
import UserCache from '../cache/userCache';
import AuthenticationAPI from '../api/Authentication';
import { useMutationReq } from '../hooks/useRequest';

class AuthenticationService {
  public static useLogin() {
    const { setUser } = useAuth();
    const { markAppisInitialized } = useAppState();
    const { mutate, ...rest } = useMutationReq({
      queryKey: 'useLogin',
      request: AuthenticationAPI.login,
      onSuccess: ({ data }) => {
        const loggedInUser = data;

        setUser(loggedInUser);
        UserCache.storeUserData(loggedInUser);
        markAppisInitialized;
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
  /*   public static register() {
    const { setUser } = useContext(UserContext);
    const { setAppState } = useContext(AppStateContext);
    const { mutate, ...rest } = useMutationReq({
      queryKey: "register",
      request: AuthenticationAPI.register,
      onSuccess: ({ data }) => {
        const { user, token } = data;
        const logedinUser = new User(
          token,
          user.email,
          user.avatar,
          user.id,
          user.name,
          user.username
        );
        setUser(logedinUser);
        UserDAO.save(logedinUser);
        setAppState({ registrationStep: 1 });
        AppStateDAO.save({ registrationStep: 1 });
      },
      onError: (err: AxiosError) => console.log("onError", err.response?.data),
    }); 

    const onRegister = async (data: any) => {
      mutate({
        username: data.username as string,
        email: data.email as string,
        password: data.password as string,
        deviceName: deviceName || "device",
      });
    };

    return { onRegister, ...rest };
  }*/
  /*   public static registerPersonalInfo() {
    const { setUser, user: oldUser } = useContext(UserContext);
    const { appState } = useContext(AppStateContext);
    const navigation = useNavigation();
    const { mutate, ...rest } = useMutationReq({
      queryKey: "registerPersonalInfo",
      request: AuthenticationAPI.registerPersonalInfo,
      onSuccess: ({ data }) => {
        const { userData, user } = data;
        const updatedUser = new User(
          oldUser?.token as string,
          user.email,
          user.avatar,
          user.id,
          user.name,
          user.username
        );
        updatedUser.sexe = userData.sexe;
        setUser(updatedUser);
        UserDAO.save(updatedUser);
        AppStateDAO.save({ ...appState, registrationStep: 4 } as AppState);
        navigation.replace(Routes.REGISTER_STACK.REGISTER_STEP_4);
      },
      onError: (err: AxiosError) => console.log("onError", err.response?.data),
    });

    const onRegisterPeronalInfo = async (data: any) => {
      mutate({
        name: data.name,
        sexe: data.gender,
        token: oldUser?.token,
      });
    };

    return { onRegisterPeronalInfo, ...rest };
  } */

  /*  public static logout() {
    const { user, setUser } = useContext(UserContext);
    return useMutationReq({
      queryKey: "logout",
      request: () => AuthenticationAPI.logout((user as User).token),
      onSuccess: ({ data }) => {
        UserDAO.delete();
        setUser(null);
      },
      onError: (err: AxiosError) => console.log("onError", err.response?.data),
    });
  }

  public static useFetchUser(token: string) {
    return useQueryReq({
      queryKey: "useFetchUser",
      request: () => AuthenticationAPI.fetchUser(token),
      // onSuccess: ({ data }) => console.log("onSuccess", data),
      onError: (err: AxiosError) => console.log("onError", err.response?.data),
    });
  } */
}

export default AuthenticationService;
