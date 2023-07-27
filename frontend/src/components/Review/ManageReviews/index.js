import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  thunkGetUsersReviews } from "../../../store/reviews";
import ManageReviewsSingleReview from "./ManageReviewsSingleReview";

export default function ManageReviews() {
  const dispatch = useDispatch();
  const usersReviews = useSelector((state) => state.reviews.user);

  useEffect(() => {
    dispatch(thunkGetUsersReviews());
  }, [dispatch]);

  const usersReviewsArray = Object.values(usersReviews);

  return (
    <>
    <h1 style={{fontWeight:"400"}}>Manage Your Reviews</h1>
    <div className="list-of-reviews">
      {usersReviewsArray.map(({  Spot, review, createdAt, id }, i) => {
        return <ManageReviewsSingleReview key={i} createdAt={createdAt} review={review} Spot={Spot} id={id}/>;
      })}
    </div>
    </>
  );
}
