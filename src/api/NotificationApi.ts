import { RequestHandler } from '../config';

class NotificationApi {
  public static async getNotifications(token: string | null) {
    return RequestHandler({
      url: '/notifications/all',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async getUnreadNotifications(token: string | null) {
    return RequestHandler({
      url: '/notifications/unread',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async markAsReadNotifications(token: string | null) {
    return RequestHandler({
      url: '/notifications/mark-as-read',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async markAsReadNotif({ id, token }: { id: string; token: string | null }) {
    return RequestHandler({
      url: `/notifications/mark-as-read/${id}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default NotificationApi;
