import { RequestHandler } from '../config';

interface LoginDTO {
  username: string;
  password: string;
}
interface RegisterDTO {
  username: string;
  email: string;
  password: string;
}
interface RegisterPeronalInfoDTO {
  sexe: string;
  name: string;
  token: string;
}

class AuthenticationAPI {
  public static async login({ username, password }: LoginDTO) {
    return RequestHandler({
      url: '/users',
      method: 'GET',
      params: {
        username,
        password,
      },
    });
  }
  public static async fetchUser(token: string) {
    console.log('🚀 ~ file: Authentication.ts:23 ~ AuthenticationAPI ~ fetchUser');
    return RequestHandler({
      url: '/login',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async register(registerDTO: RegisterDTO) {
    return RequestHandler({
      url: '/register',
      method: 'POST',
      data: registerDTO,
    });
  }

  public static async logout(token: string) {
    return RequestHandler({
      url: '/logout',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default AuthenticationAPI;
