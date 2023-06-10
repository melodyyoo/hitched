
import { useSelector } from "react-redux";
import DeleteReviewButton from "../DeleteReview/DeleteReviewButton";
import './SingleReview.css'


export default function SingleReview({User, createdAt, review, reviewId}){
    const user = useSelector(state=> state.session.user);

    const date = createdAt.slice(0,7);
    const dateArray = date.split('-');

    const year = dateArray[0];
    let month = ''

    if(dateArray[1]==='02')month = "February"
    if(dateArray[1]==='03')month = "March"
    if(dateArray[1]==='04')month = "April"
    if(dateArray[1]==='05')month = "May"
    if(dateArray[1]==='06')month = 'June'
    if(dateArray[1]==='07')month = "July"
    if(dateArray[1]==='08')month = "August"
    if(dateArray[1]==='09')month = "September"
    if(dateArray[1]==='10')month = "October"
    if(dateArray[1]==='11')month = "November"
    if(dateArray[1]==='12')month = "December"

    return(
        <div className="single-review">
        <h4 className="review-firstname">{User.firstName}</h4>
        <h5 className="review-date">{`${month} ${year}`}</h5>
        <p className="review">{review}</p>
        {user && (User.id === user.id )? <DeleteReviewButton reviewId={reviewId}/> : null}
        </div>
    )
}
