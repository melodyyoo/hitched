
export default function ManageReviewsSingleReview({ createdAt , review , Spot }){
    const date = createdAt.slice(0,10);
    return(
        <>
        <h3>{Spot.name}</h3>
        <h5>{date}</h5>
        <p>{review}</p>
        <button>Update</button>
        <button>Delete</button>
        </>
    )
}
