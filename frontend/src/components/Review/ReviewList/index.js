import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllReviews, thunkGetUsersReviews } from "../../../store/reviews";
import SingleReview from "../SingleReview";
import { AverageStarRatingBig } from "../../Spot/AverageStarRating";

export default function ReviewList({ avgStarRating, numReviews, Owner, id:spotId }) {
    const dispatch = useDispatch();
    const allReviews = useSelector(state=>state.reviews.allReviews)
    const user = useSelector(state=>state.session.user);
    const usersReviews = useSelector(state=>state.reviews.user);

 

    useEffect(() => {
        dispatch(thunkGetAllReviews(parseInt(spotId)));
        dispatch(thunkGetUsersReviews());
    }, [dispatch, spotId]);

    const reviewsArray = Object.values(allReviews);
    const usersReviewsArray = Object.values(usersReviews);



    const userHasSpotReviewCheck=()=>{
        const exists = usersReviewsArray.find((review)=>{
            return review.spotId === parseInt(spotId)
        });
      return !!exists //makes exists a boolean
    }

    return (
    <div>
        <AverageStarRatingBig numReviews={numReviews} avgStarRating={avgStarRating}/>
      {user && Owner && (user.id !== Owner.id) && !userHasSpotReviewCheck() && <button>Post Your Review</button>}
      <div className="list-of-reviews">
            {reviewsArray.map(({User, createdAt, review, id})=>{
                return <SingleReview key={id} User={User} createdAt={createdAt} review={review}/>
            })}
      </div>

    </div>


  );
}
