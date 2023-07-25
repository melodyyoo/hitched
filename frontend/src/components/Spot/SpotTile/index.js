import "./SpotTile.css";
import { useHistory } from "react-router-dom";

const SpotTile = ({ previewImage, location, price, avgRating, id , name}) => {
  const image =
    previewImage === "No preview image available" ? (
      <div
        style={{
          width: 250,
          height: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {previewImage}
      </div>
    ) : (
      <img src={previewImage} alt="Spot" />
    );

  const history = useHistory();

  return (
    <>
      <div className="spot-tile" onClick={(e) => history.push(`/spots/${id}`)}>
        <div className="hover-text">
          <span className="tooltip-text">{name}</span>
        </div>
        {image}
        <div className="location-and-rating">
          <p>{location}</p>
          <div className="star-and-rating" style={{ display: "flex" }}>
            <i className="fa-solid fa-star landing-page-star" style={{ fontWeight: 150, fontSize: 12 }}></i>
            <span>{avgRating ? <p>{parseFloat(avgRating).toFixed(1)}</p> : <p>New</p>}</span>
          </div>
        </div>
        <p>${price} day</p>
      </div>
    </>
  );
};

export default SpotTile;
