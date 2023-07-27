import { useDispatch, useSelector } from "react-redux";
import "./CreateBooking.css";
import { useEffect, useState } from "react";
import { thunkGetSingleSpot } from "../../../store/spots";
import { useParams } from "react-router-dom";

export default function CreateBooking() {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.singleSpot);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");

  console.log('start date: ', startDate)
  useEffect(() => {
    dispatch(thunkGetSingleSpot(spotId));
  }, [dispatch, spotId]);

  const onSubmit = () =>{
    
  }

  return (
    <div>
      <h1 style={{ fontWeight: "400" }}>Request to book</h1>
      <div>
        <div className="booking-form-wrapper">
          <h2>Your trip</h2>
          <form onSubmit={onSubmit}>
            <label htmlFor="start-date">Start date</label>
            <input id="start-date" type="date" onChange={e=>setStartDate(e.target.value)}/>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
        <div className="spot-details"></div>
      </div>
    </div>
  );
}
