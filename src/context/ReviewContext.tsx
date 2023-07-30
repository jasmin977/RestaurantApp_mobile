import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Review } from '../entities';

type ReviewContextType = {
  reviews: Review[];
  reviewsByRestaurantId: Review[];
  addReview: (review: Review) => void;
  setReviews: (reviews: Review[]) => void;
  setReviewsByRestaurantId: (reviews: Review[]) => void;
};

const ReviewContext = createContext<ReviewContextType>({
  reviews: [],
  reviewsByRestaurantId: [],
  addReview: () => {},
  setReviews: () => {},
  setReviewsByRestaurantId: () => {},
});
interface Props {
  children: ReactNode;
}

const sortReviewsByDateDescending = (reviews: Review[]) => {
  const sortedReviews = reviews.sort(
    (a, b) => new Date(b.reviewedAt).getTime() - new Date(a.reviewedAt).getTime()
  );
  return sortedReviews;
};
const ReviewProvider = ({ children }: Props) => {
  const [reviews, setReviewsState] = useState<Review[]>([]);
  const [reviewsByRestaurantId, setReviewsByRestaurantIdState] = useState<Review[]>([]);

  //for all the review in feed screen
  const setReviews = (updatedReviews: Review[]) => {
    const sortedReviews = sortReviewsByDateDescending(updatedReviews);
    setReviewsState(sortedReviews);
  };

  //for  the reviews in one restaurant screen
  const setReviewsByRestaurantId = (updatedReviews: Review[]) => {
    const sortedReviews = sortReviewsByDateDescending(updatedReviews);
    setReviewsByRestaurantIdState(sortedReviews);
  };
  const addReview = (review: Review) => {
    setReviewsState(prevReviews => {
      const updatedReviews = [review, ...prevReviews];

      return sortReviewsByDateDescending(updatedReviews);
    });
    setReviewsByRestaurantIdState(prevReviews => {
      const updatedReviews = [review, ...prevReviews];

      return sortReviewsByDateDescending(updatedReviews);
    });
  };

  const getReviewsByRestaurantId = (restaurantId: number) => {
    return reviews.filter(review => review.restaurantId.id === restaurantId);
  };

  return (
    <ReviewContext.Provider
      value={{ reviews, addReview, setReviews, setReviewsByRestaurantId, reviewsByRestaurantId }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
export default ReviewProvider;
export const useReviewContext = () => useContext(ReviewContext);
