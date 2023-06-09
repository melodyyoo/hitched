import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllReviews, thunkGetUsersReviews } from "../../../store/reviews";
import SingleReview from "../SingleReview";
import { AverageStarRatingBig } from "../../Spot/AverageStarRating";
import CreateAReviewButton from "../CreateAReviewModal/CreateAReviewButton";

export default function ReviewList({ avgStarRating, numReviews, Owner, id: spotId }) {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.reviews.allReviews);
  const user = useSelector((state) => state.session.user);
  const usersReviews = useSelector((state) => state.reviews.user);

  useEffect(() => {
    dispatch(thunkGetAllReviews(parseInt(spotId)));
    if (user) {
      dispatch(thunkGetUsersReviews());
    }
  }, [dispatch, spotId, user]);

  const reviewsArray = Object.values(allReviews);
  const usersReviewsArray = Object.values(usersReviews);

  const userHasSpotReviewCheck = () => {
    const exists = usersReviewsArray.find((review) => {
      return review.spotId === parseInt(spotId);
    });
    return !!exists; //makes exists a boolean
  };

  if (!allReviews) return null;

  return (
    <div>
      <AverageStarRatingBig numReviews={numReviews} avgStarRating={avgStarRating} />
      {user && Owner && user.id !== Owner.id && !userHasSpotReviewCheck() && (
        <CreateAReviewButton spotId={spotId} />
      )}
      {reviewsArray.length > 0 ? (
        <div className="list-of-reviews">
          {reviewsArray.map((review) => {
            return (
              <SingleReview
                key={review.id}
                reviewId={review.id}
                User={review.User}
                createdAt={review.createdAt}
                review={review.review}
              />
            );
          })}
        </div>
      ) : (
        <p>Be the first to post a review!</p>
      )}
    </div>
  );
}
