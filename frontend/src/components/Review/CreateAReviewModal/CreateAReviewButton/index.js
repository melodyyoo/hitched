import CreateAReviewModal from "..";
import OpenModalButton from "../../../OpenModalButton";

export default function CreateAReviewButton({spotId}){
    return(
        <OpenModalButton
        buttonText='Post Your Review'
        modalComponent={<CreateAReviewModal spotId={spotId}/>}
        />
    )
}
