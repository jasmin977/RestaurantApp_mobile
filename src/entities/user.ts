import Restaurant from './restaurant';
import Review from './review';

interface user {
  id: number | string;
  bio?: string;
  name: string;
  password?: string;
  datOfBirth?: string;
  phone?: string;
  email?: string;
  gender?: number;
  profileImg?: string;
  avatar?: string;
  avatar_url?: number;
  followers?: user[];
  isFollowing?: boolean;

  followings?: user[];
  likes?: Restaurant[];
  reviews?: Review[];
}

export default user;
