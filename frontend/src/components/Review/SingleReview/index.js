
export default function SingleReview({User, createdAt, review}){
    const date = createdAt.slice(0,10);
    return(
        <>
        <h4>{User.firstName}</h4>
        <h5>{date}</h5>
        <p>{review}</p>
        </>
    )
}
