import OpenModalButton from "../../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";



export default function DeleteSpot(){
    return(
        <OpenModalButton
        buttonText='Delete'
        modalComponent={<DeleteSpotModal/>}
        />
    )
}
