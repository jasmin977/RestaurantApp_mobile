import { useMutationReq, useQueryReq } from '../hooks/useRequest';
import NotificationApi from '../api/NotificationApi';
import { AxiosError } from 'axios';
import { useAppState, useAuth } from '../context';

class NotificationService {
  public static useFetchNotifcations(token: string | null) {
    return useQueryReq({
      queryKey: 'useFetchNotifications',
      request: () => NotificationApi.getNotifications(token),
      onError: (err: AxiosError) =>
        console.log('onError :useFetchNotifications', err.response?.data),
    });
  }
  public static useFetchUnreadNotifcations() {
    const { token } = useAuth();

    const { setunreadNotif } = useAppState();

    return useQueryReq({
      queryKey: 'useFetchUnreadNotifications',
      request: () => NotificationApi.getUnreadNotifications(token),
      onSuccess: ({ data }) => setunreadNotif(data.notifications.length),
      onError: (err: AxiosError) =>
        console.log('onError :useFetchUnreadNotifications', err.response?.data),
    });
  }

  public static useMarkAllAsRead() {
    const { setunreadNotif } = useAppState();

    return useMutationReq({
      queryKey: 'markallnotifasread',
      request: NotificationApi.markAsReadNotifications,
      onSuccess: ({ data }) => {
        setunreadNotif(0);
      },
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
  }
  public static useMarkAsReadNotif() {
    const { setunreadNotif } = useAppState();

    return useMutationReq({
      queryKey: 'markonenotifasread',
      request: NotificationApi.markAsReadNotif,
      onSuccess: ({ data }) => {
        setunreadNotif(prevCount => prevCount - 1);
      },
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
  }
}

export default NotificationService;
