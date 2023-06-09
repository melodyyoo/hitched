import { useEffect} from "react";
import SpotTile from "../SpotTile";
import "./SpotTiles.css";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots } from "../../../store/spots";

const SpotTiles = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(thunkGetAllSpots());
  }, [dispatch]);

  const spotsArray = Object.values(spots);

  console.log('spotsArray: ', spotsArray)
  return (
    <div className="spot-tiles">
      {spotsArray.map(({ id, price, city, state, avgRating, previewImage,name }) => {
        return (
          <SpotTile
            key={id}
            price={price}
            location={`${city}, ${state}`}
            avgRating={avgRating}
            previewImage={previewImage}
            id={id}
            name={name}
          />
        );
      })}
    </div>
  );
};

export default SpotTiles;
