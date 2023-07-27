import { useEffect } from "react";
import { thunkGetAllSpots, thunkGetSingleSpot } from "../../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import SpotTile from "../SpotTile";
import { useHistory } from "react-router-dom";
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
      return user ? spot.ownerId === user.id : false;
  });

  return (
    <>
      <div>
        <h1 style={{fontWeight:"400"}}>Manage Your Venues</h1>
        <button style={{marginLeft: 34, boxShadow: '4px 4px 5px rgb(151, 150, 150)', cursor:'pointer'}} onClick={(e) => history.push("/spots/new")}>Create a New Venue</button>
      </div>
      <div className="spot-tiles">
        {usersSpotsArray.map(({ id, price, city, state, avgRating, previewImage , name}) => {
          return (
            <div key={id} className="manage-tile" style={{ display: "flex", flexDirection: "column" }}>
              <SpotTile
                key={id}
                price={price}
                location={`${city}, ${state}`}
                avgRating={avgRating}
                previewImage={previewImage}
                id={id}
                name={name}
              />
              <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                <button style={{ boxShadow: '4px 4px 5px rgb(151, 150, 150)', cursor:'pointer', height:"23px"}} onClick={e=>{dispatch(thunkGetSingleSpot(id)).then(()=>history.push(`/spots/${id}/edit`))}}>Update</button>
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
