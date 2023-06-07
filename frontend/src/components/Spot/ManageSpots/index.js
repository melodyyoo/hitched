import { useEffect } from "react";
import { thunkGetAllSpots } from "../../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import SpotTile from "../SpotTile";
import { useHistory } from "react-router-dom";
import DeleteSpot from "../../DeleteSpot/DeleteSpotButton";
import OpenModalButton from "../../OpenModalButton";
import DeleteSpotModal from "../../DeleteSpot/DeleteSpotModal";

export default function ManageSpots() {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state.spots.allSpots);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetAllSpots());
  }, [dispatch]);

  const spotsArray = Object.values(spots);

  const usersSpotsArray = spotsArray.filter((spot) => {
    if (user) return spot.ownerId === user.id;
  });

  return (
    <>
      <div>
        <h1>Manage Your Spots</h1>
        <button onClick={(e) => history.push("/spots/new")}>Create a New Spot</button>
      </div>
      <div className="spot-tiles">
        {usersSpotsArray.map(({ id, price, city, state, avgRating, previewImage }) => {
          return (
            <div key={id} className="manage-tile" style={{ display: "flex", flexDirection: "column" }}>
              <SpotTile
                key={id}
                price={price}
                location={`${city}, ${state}`}
                avgRating={avgRating}
                previewImage={previewImage}
                id={id}
              />
              <div className="update-delete-buttons">
                <button>Update</button>
                <p>
                  <OpenModalButton buttonText="Delete" modalComponent={<DeleteSpotModal id={id}/>} />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
