import OpenModalButton from "../../../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";



export default function DeleteReviewButton({reviewId}){
    return(
        <OpenModalButton
        buttonText='Delete'
        modalComponent={<DeleteReviewModal reviewId={reviewId}/>}
        />
    )
}
