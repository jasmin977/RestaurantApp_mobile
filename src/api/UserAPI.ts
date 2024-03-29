import { RequestHandler } from '../config';
import { useAuth } from '../context';
interface userDTO {
  bio?: string;
  name?: string;
  datOfBirth?: string;
  phone?: string;
  email?: string;
  gender?: number;
  avatar?: string;
}
class UserAPI {
  public static async getUsers(token: string | null) {
    return RequestHandler({
      url: '/users',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async getUserById(id: number | string, token: string | null) {
    return RequestHandler({
      url: `/users/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async updateUser({
    id,
    token,
    data,
  }: {
    id: number | string;
    token: string | null;
    data: userDTO;
  }) {
    return RequestHandler({
      url: `/users`,
      method: 'PUT',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async followUser({ id, token }: { id: number | string; token: string | null }) {
    return RequestHandler({
      url: `/users/${id}/follow`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async unfollowUser({ id, token }: { id: number | string; token: string | null }) {
    return RequestHandler({
      url: `/users/${id}/unfollow`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default UserAPI;
