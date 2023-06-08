

export function AverageStarRatingSmall({avgStarRating, numReviews}){

    const ReviewNumberCheck=()=>{
        if(numReviews===1){
            return <p className="child" style={{ marginLeft: 10 }}>
            {numReviews} review
          </p>
        }else if(!numReviews){
            return <p style={{marginLeft: 10, marginTop: 25}}>New</p>
        }else{
            return <p className="child" style={{ marginLeft: 10}}>
            {numReviews} reviews
          </p>
        }
    }

    return(
        <div style={{ display: "flex" }}>
        <i className="fa-solid fa-star child"></i>
        <p className="child">{avgStarRating}</p>
        <ReviewNumberCheck/>
      </div>
    )
}

export function AverageStarRatingBig({avgStarRating, numReviews}){
    const ReviewNumberCheck=()=>{
        if(numReviews===1){
            return <h2 className="child" style={{ marginLeft: 20 }}>
            {numReviews} review
          </h2>
        }else if(!numReviews){
            return <h2>New</h2>
        }else{
            return <h2 className="child" style={{ marginLeft: 20 }}>
            {numReviews} reviews
          </h2>
        }
    }

    return(
        <div style={{ display: "flex" }}>
        <i className="fa-solid fa-star"></i>
        <h2>{avgStarRating}</h2>
        <ReviewNumberCheck />
      </div>
    )
}
