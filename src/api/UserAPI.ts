import { RequestHandler } from '../config';

class UserAPI {
  public static async getUsers() {
    return RequestHandler({
      url: '/users',
      method: 'GET',
    });
  }
  public static async getUserById(id: number) {
    return RequestHandler({
      url: `/users/${id}`,
      method: 'GET',
    });
  }
}

export default UserAPI;
