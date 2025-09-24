interface Notification {
  id: string | number;
  type: string;
  notifiable_type: string;
  notifiable_id: string | number;
  read_at: Date | null;
  created_at: Date;
  data: {
    message: string;
    id: string | number;
  };
}

export default Notification;
