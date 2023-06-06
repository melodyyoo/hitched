import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSingleSpot } from "../../../store/spots";
import "./SpotDetails.css";

export default function SpotDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);

  useEffect(() => {
    dispatch(thunkGetSingleSpot(id));
  }, [dispatch]);

  if (!spot) return null;

  const { name, city, state, country, SpotImages, Owner, description, avgStarRating, numReviews, price } = spot;

  return (
    <>
      <h1>{name}</h1>
      <h4>
        {city}, {state}, {country}
      </h4>
      <div className="images-div">
        {SpotImages &&
          SpotImages.map((image) => {
            if (image.preview === true) {
              return <img key={image.url} src={image.url} alt="No preview image available" />;
            } else {
              return <p>No preview image available</p>;
            }
          })}
      </div>
      <div className="description-div" style={{ borderBottom: "solid black" }}>
        <div className="owner-and-description">
          {Owner && (
            <h2 className="child">
              Hosted by {Owner.firstName} {Owner.lastName}
            </h2>
          )}
          <p className="child">{description}</p>
        </div>
        <div className="reserve-box">
          <div className='reserve-box-info'>

            <h2 className="child" style={{width:'fit-content'}}>${price} per day</h2>
            <div style={{ display: "flex" }}>
              <i className="fa-solid fa-star child"></i>
              <p className="child">{avgStarRating}</p>
              {numReviews === 1 ? (
                <p className="child" style={{ marginLeft: 10 }}>
                  {numReviews} review
                </p>
              ) : (
                <p className="child" style={{ marginLeft: 10 }}>
                  {numReviews} reviews
                </p>
              )}
            </div>
          </div>
            <button
              onClick={(e) => window.alert("Feature coming soon...")}
              style={{ width: 300, height: 50 }}
            >
              Reserve
            </button>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <i className="fa-solid fa-star"></i>
        <h2>{avgStarRating}</h2>
        {numReviews === 1 ? (
          <h2 style={{ marginLeft: 30 }}>{numReviews} review</h2>
        ) : (
          <h2>{numReviews} reviews</h2>
        )}
      </div>
    </>
  );
}
