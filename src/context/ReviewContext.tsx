import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Review } from '../entities';

type ReviewContextType = {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
};

const ReviewContext = createContext<ReviewContextType>({
  reviews: [],
  setReviews: () => {},
});
interface Props {
  children: ReactNode;
}

const ReviewProvider = ({ children }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  //for all the review in feed screen

  return (
    <ReviewContext.Provider value={{ reviews, setReviews }}>{children}</ReviewContext.Provider>
  );
};
export default ReviewProvider;
export const useReviewContext = () => useContext(ReviewContext);
