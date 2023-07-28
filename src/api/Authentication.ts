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

  public static async register(registerDTO: RegisterDTO) {
    return RequestHandler({
      url: '/users',
      method: 'POST',
      data: registerDTO,
    });
  }
}

export default AuthenticationAPI;
