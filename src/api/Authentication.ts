import { RequestHandler } from '../config';

interface LoginDTO {
  name: string;
  password: string;
}
interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

class AuthenticationAPI {
  public static async login(logindto: LoginDTO) {
    console.log(
      '🚀 ~ file: Authentication.ts:15 ~ AuthenticationAPI ~ login ~  name, password:',
      logindto
    );
    return RequestHandler({
      url: '/login',
      method: 'POST',
      data: logindto,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  public static async verify({ pin, token }: { pin: number; token: string | null }) {
    return RequestHandler({
      url: `register/verify-pin/${pin}`,
      method: 'POST',

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async re_send_pin(token: string | null) {
    return RequestHandler({
      url: `/register/re-send`,
      method: 'POST',

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
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default AuthenticationAPI;
