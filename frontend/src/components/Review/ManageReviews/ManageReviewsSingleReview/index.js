import DeleteReviewButton from "../../DeleteReview/DeleteReviewButton";

export default function ManageReviewsSingleReview({ createdAt , review , Spot, id }){
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
        <>
        <h3>{Spot.name}</h3>
        <h5>{`${month} ${year}`}</h5>
        <p>{review}</p>
        <button style={{cursor:'pointer', marginRight: 10, boxShadow:`4px 4px 5px rgb(151, 150, 150)`}} onClick={e=> window.alert('Feature coming soon...')}>Update</button>
        {<DeleteReviewButton reviewId={id}/>}
        </>
    )
}
