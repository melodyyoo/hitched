export function AverageStarRatingSmall({ avgStarRating, numReviews }) {
  const ReviewNumberCheck = () => {
    if (numReviews === 1) {
      return (
        <div style={{ display: "flex" }}>
          <p style={{ fontSize: 30, marginLeft: 13, height: "fit-content" }}>·</p>
          <p className="child" style={{ marginLeft: 10 }}>
            {numReviews} review
          </p>
        </div>
      );
    } else if (!numReviews) {
      return <p style={{ marginLeft: 5, marginTop: 25, marginRight:10 }}>New</p>;
    } else {
      return (
        <div style={{ display: "flex" }}>
          <p style={{ fontSize: 30, marginLeft: 13, height: "fit-content" }}>·</p>
          <p className="child" style={{ marginLeft: 10 }}>
            {numReviews} reviews
          </p>
        </div>
      );
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <i className="fa-solid fa-star child"></i>
      <p className="child">{isNaN(avgStarRating) ? null : avgStarRating}</p>
      <ReviewNumberCheck />
    </div>
  );
}

export function AverageStarRatingBig({ avgStarRating, numReviews }) {
  const ReviewNumberCheck = () => {
    if (numReviews === 1) {
      return (
        <div style={{ display: "flex" }}>
          <p style={{ fontSize: 30, marginLeft: 13, height: "fit-content", position: "relative", right: -4 }}>
            ·
          </p>
          <h2 className="child" style={{ marginLeft: 20 }}>
            {numReviews} review
          </h2>
        </div>
      );
    } else if (!numReviews) {
      return <h2>New</h2>;
    } else {
      return (
        <div style={{display: 'flex'}}>
          <p style={{ fontSize: 30, marginLeft: 13, height: "fit-content", position: "relative", right: -4 }}>
            ·
          </p>
          <h2 className="child" style={{ marginLeft: 20 }}>
            {numReviews} reviews
          </h2>
        </div>
      );
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <i className="fa-solid fa-star"></i>
      <h2 style={{ display: "flex", alignItems: "center" }}>{isNaN(avgStarRating) ? null : avgStarRating}</h2>
      <ReviewNumberCheck />
    </div>
  );
}
