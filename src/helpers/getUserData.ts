import { user } from '../entities';
import UserService from '../service/Users';

const getUserData = (id: string | undefined | number, user: user): user => {
  if (id !== undefined) {
    const { data: userProfileData, isLoading } = UserService.useFetchUserByID(id);
    return userProfileData?.data ?? null;
  } else {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      gender: user.gender,
    };
  }
};

export { getUserData };
