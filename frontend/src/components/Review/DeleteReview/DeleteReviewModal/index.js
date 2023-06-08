import { useDispatch } from "react-redux";

import { thunkDeleteAReview } from "../../../../store/reviews";
import { useModal } from "../../../../context/Modal";

export default function DeleteReviewModal({reviewId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const onSubmit = async()=>{
        dispatch(thunkDeleteAReview(reviewId))
    }

  return (
    <form onSubmit={onSubmit}>
      <h1 style={{textAlign:'center'}}>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <button type='submit'>Yes (Delete Review)</button>
      <button type='button' onClick={closeModal}>No (Keep Review)</button>
    </form>
  );
}
