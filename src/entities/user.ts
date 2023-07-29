interface user {
  id?: number | string;
  bio?: string;
  username: string;
  password: string;
  datOfBirth?: string;
  phone?: string;
  email?: string;
  gender?: number;
  profileImg?: string;
}

export default user;
