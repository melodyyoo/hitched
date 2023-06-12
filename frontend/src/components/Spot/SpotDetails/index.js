import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSingleSpot } from "../../../store/spots";
import "./SpotDetails.css";
import ReviewList from "../../Review/ReviewList";
import { AverageStarRatingSmall } from "../AverageStarRating";

export default function SpotDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);

  useEffect(() => {
    dispatch(thunkGetSingleSpot(id));
  }, [dispatch, id]);

  if (!spot) return null;

  const { name, city, state, country, SpotImages, Owner, description, avgStarRating, numReviews, price } =
    spot;

  const otherImagesArray = [];
  if (SpotImages) {
    for (let i = 1; i < SpotImages.length; i++) {
      const image = SpotImages[i];
      otherImagesArray.push(image);
    }
  }
  const classNames = ["one", "two", "three", "four"];

  if (!SpotImages) return null;


  const previewImage =
    SpotImages[0] != null ? <img className="preview-image" src={SpotImages[0].url} alt="Spot" /> : null;
  return (
    <>
      <div className="spot-details-div">
        <h1 style={{ textAlign: "left" }}>{name}</h1>
        <h4>
          {city}, {state}, {country}
        </h4>
        <div className="images-div">
          <div className="preview-image-div">{previewImage}</div>
          <div className="other-images-div">
            {SpotImages &&
              otherImagesArray.map((image, i) => {
                return <img key={i} className={classNames[i]} src={image.url} alt="Spot" />;
              })}
          </div>
        </div>
        <div className="description-div">
          <div className="owner-and-description">
            {Owner && (
              <h2 style={{ display: "flex", justifyContent: "start" }} className="child">
                Hosted by {Owner.firstName} {Owner.lastName}
              </h2>
            )}
            <p className="child description">{description}</p>
          </div>
          <div>
            <div className="reserve-box">
              <div className="reserve-box-info">
                <h2 className="child" style={{ width: "fit-content" }}>
                  ${price} day
                </h2>
                <AverageStarRatingSmall avgStarRating={avgStarRating} numReviews={numReviews} />
              </div>
              <div className="reserve-button-div">
                <button className="reserve-button" onClick={(e) => window.alert("Feature coming soon...")}>
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="review-list-div">
        <ReviewList id={id} Owner={Owner} avgStarRating={avgStarRating} numReviews={numReviews} />
      </div>
    </>
  );
}
