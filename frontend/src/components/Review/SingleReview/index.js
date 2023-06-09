
import { useSelector } from "react-redux";
import DeleteReviewButton from "../DeleteReview/DeleteReviewButton";


export default function SingleReview({User, createdAt, review, reviewId}){
    const date = createdAt.slice(0,10);
    const user = useSelector(state=> state.session.user);

    return(
        <div className="single-review">
        <h4>{User.firstName}</h4>
        <h5>{date}</h5>
        <p>{review}</p>
        {user && (User.id === user.id )? <DeleteReviewButton reviewId={reviewId}/> : null}
        </div>
    )
}
