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
    <h1>Manage Reviews</h1>
    <div className="list-of-reviews">
      {usersReviewsArray.map(({  Spot, review, createdAt, }) => {
        return <ManageReviewsSingleReview createdAt={createdAt} review={review} Spot={Spot} />;
      })}
    </div>
    </>
  );
}
