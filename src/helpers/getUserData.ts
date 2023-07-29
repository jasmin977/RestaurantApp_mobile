import { user } from '../entities';
import UserService from '../service/Users';

function getUserData(id: string | undefined | number, user: user | null): user | null {
  if (id) {
    const { data: userProfileData, isLoading: userProfileIsLoading } =
      UserService.useFetchUserByID(id);
    return userProfileIsLoading ? null : userProfileData?.data;
  } else {
    return user
      ? {
          id: user.id,
          username: user.username,
          password: user.password,
          email: user.email,
          gender: user.gender,
        }
      : null;
  }
}

export { getUserData };
