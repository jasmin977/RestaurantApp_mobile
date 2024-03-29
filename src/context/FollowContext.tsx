import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Restaurant, user } from '../entities';

// Define the shape of the context
interface FollowContextType {
  followings: user[];

  likedRestaurants: Restaurant[];
  isFollowing: (user: user) => boolean;
  isLikingRestaurant: (res: Restaurant) => boolean;

  setFollowings: React.Dispatch<React.SetStateAction<user[]>>;
  setLikedRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
}

const FollowContext = createContext<FollowContextType>({
  followings: [],
  isFollowing: () => false,
  isLikingRestaurant: () => false,
  likedRestaurants: [],
  setFollowings: () => {},
  setLikedRestaurants: () => {},
});

interface FollowProviderProps {
  children: ReactNode;
}

export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
  const [followings, setFollowings] = useState<user[]>([]);
  // const [followers, setFollowers] = useState<user[]>([]);
  const [likedRestaurants, setLikedRestaurants] = useState<Restaurant[]>([]);

  /*  const isFollowing: boolean =
    !!loggedin && followers.length != 0 && followers.some(user => user.id == loggedin.id);
 */
  const isFollowing = (user: user) => {
    // Check if the logged-in user is following the specified user
    console.log('🚀 ~ isFollowing ', followings.includes(user));
    return followings.includes(user);
  };

  const isLikingRestaurant = (restaurantId: Restaurant) => {
    // Check if the logged-in user has liked the specified restaurant
    return likedRestaurants.includes(restaurantId);
  };

  const contextValues: FollowContextType = {
    likedRestaurants,
    setLikedRestaurants,
    isFollowing,
    isLikingRestaurant,

    setFollowings,
    followings,
  };

  return <FollowContext.Provider value={contextValues}>{children}</FollowContext.Provider>;
};

// Create a custom hook to consume the context
export const useFollowContext = () => useContext(FollowContext);
