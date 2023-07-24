import { user } from '../entities';
import { GLOBAL_STORAGE } from '.';

const USER_KEY = 'user_data';

class UserCache {
  public static storeUserData(userData: user) {
    GLOBAL_STORAGE.set(USER_KEY, JSON.stringify(userData));
  }

  public static getUserData(): user | null {
    const userData = GLOBAL_STORAGE.getString(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  public static clearUserData() {
    GLOBAL_STORAGE.delete(USER_KEY);
  }
}

export default UserCache;
