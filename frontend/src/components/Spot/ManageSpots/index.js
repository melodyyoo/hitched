import { useEffect } from "react";
import { thunkGetAllSpots } from "../../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import SpotTile from "../SpotTile";

export default function ManageSpots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  const sessionUserId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(thunkGetAllSpots());
  }, [dispatch]);

  const spotsArray = Object.values(spots);
  const usersSpotsArray = spotsArray.filter((spot) => spot.id === sessionUserId);

  return (
    <>
      <div>
        <h1>Manage Your Spots</h1>
        <button>Create a New Spot</button>
      </div>
      <div className="spot-tiles">
        {usersSpotsArray.map(({ id, price, city, state, avgRating, previewImage }) => {
          return (
            <div className="manage-tile" style={{display:'flex', flexDirection:'column'}}>
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
                <button>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
