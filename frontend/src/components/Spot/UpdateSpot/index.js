import "../../CreateSpot/CreateSpot.css";
import FormLocation from "./FormLocation";
import FormDescription from "./FormDescription";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { thunkUpdateASpot } from "../../../store/spots";
import "./UpdateSpot.css";

export default function UpdateSpot({ newSpot, id }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [description, setDescription] = useState(newSpot.description);
  const [country, setCountry] = useState(newSpot.country);
  const [address, setAddress] = useState(newSpot.address);
  const [city, setCity] = useState(newSpot.city);
  const [state, setState] = useState(newSpot.state);
  const [title, setTitle] = useState(newSpot.name);
  const [price, setPrice] = useState(newSpot.price);

  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    //compile the form info into a spot object
    const newSpot = {
      address,
      city,
      state,
      country,
      name: title,
      description,
      price,
    };

    const tempErrors = {};
    if (description.length < 30) tempErrors.description = "Description needs a minimum of 30 characters";

    const tempErrorsArray = Object.values(tempErrors);
    if (tempErrorsArray.length > 0) {
      setErrors(tempErrors);
    } else {
      dispatch(thunkUpdateASpot(newSpot, id))
        .then((spot) => history.push(`/spots/${spot.id}`))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors({ ...data.errors, ...errors });
          }
        });
    }
  };

  return (
    <div className="create-form-outer-container">
      <form className="create-form-inner-container" onSubmit={onSubmit}>
        <FormLocation
          errors={errors}
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          address={address}
          setAddress={setAddress}
          country={country}
          setCountry={setCountry}
        />
        <FormDescription errors={errors} description={description} setDescription={setDescription} />
        <div className="form-element spot-title">
          <h2>Create a title for your spot</h2>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
            style={{ width: "95%" }}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Name of your spot"
            required
          ></input>
        </div>
        <div className="form-element">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label style={{ width: "fit-content" }} for="price">
              $
            </label>
            <input
              style={{ width: "100%" }}
              type="text"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="Price per night (USD)"
            ></input>
          </div>
        </div>
        <div className="submit-button" style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" style={{ width: "25%", marginTop: "5%", all: "unset" }}>
            Update Spot
          </button>
        </div>
      </form>
    </div>
  );
}
