import "./SpotTile.css";
import { useHistory } from "react-router-dom";

const SpotTile = ({ previewImage, location, price, avgRating, id }) => {
  const image =
    previewImage === "No preview image available" ? (
      <div
        style={{
          width: 250,
          height: 200,
          border: "solid black 1px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {previewImage}
      </div>
    ) : (
      <img src={previewImage} alt="Spot Image" />
    );

  const history = useHistory();

  return (
    <>
      <div className="spot-tile" onClick={(e) => history.push(`/spots/${id}`)}>
        {image}
        <div className="location-and-rating">
          <p>{location}</p>
          <div style={{display:'flex'}}>
            <i className="fa-solid fa-star" style={{fontWeight: 150, fontSize: 12}}></i>
            <p>{avgRating}</p>
          </div>
        </div>
        <p>${price} per day</p>
      </div>
    </>
  );
};

export default SpotTile;
