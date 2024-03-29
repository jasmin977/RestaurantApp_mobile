import { user } from '../entities';
import { GLOBAL_STORAGE } from '.';

const USER_KEY = 'user_data';
const TOKEN_KEY = 'user_token';
class UserCache {
  public static storeUserData(userData: user, token: string) {
    GLOBAL_STORAGE.set(USER_KEY, JSON.stringify(userData));
    GLOBAL_STORAGE.set(TOKEN_KEY, token);
  }

  public static getUserData(): { user: user | null; token: string | null } {
    const userData = GLOBAL_STORAGE.getString(USER_KEY);
    const token = GLOBAL_STORAGE.getString(TOKEN_KEY);

    return {
      user: userData ? JSON.parse(userData) : null,
      token: token || null,
    };
  }

  public static clearUserData() {
    GLOBAL_STORAGE.delete(USER_KEY);
    GLOBAL_STORAGE.delete(TOKEN_KEY);
  }
}

export default UserCache;
