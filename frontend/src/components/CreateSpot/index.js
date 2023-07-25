import "./CreateSpot.css";
import FormLocation from "./FormLocation";
import FormDescription from "./FormDescription";
import FormPhotos from "./FormPhotos";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { thunkCreateASpot } from "../../store/spots";

export default function CreateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
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

    const imagesArray = [
      {
        url: previewUrl,
        preview: true,
      },
      { url: url1, preview: false },
      { url: url2, preview: false },
      { url: url3, preview: false },
      { url: url4, preview: false },
    ];

    const tempErrors = {};
    if (isNaN(price))tempErrors.price = "Price must be a valid decimal."

    if (description.length < 30) tempErrors.description = "Description needs a minimum of 30 characters.";
    if(description.length > 600) tempErrors.description = "Description must be less than 600 characters."
    if (title.length > 50)tempErrors.name = "Name must be less than 50 characters";

    if (
      previewUrl &&
      !previewUrl.endsWith(".png") &&
      !previewUrl.endsWith(".jpg") &&
      !previewUrl.endsWith(".jpeg")
      )
      tempErrors.previewUrl = "Image URL must end in .png, .jpg, or .jpeg";
      if (url1 && !url1.endsWith(".png") && url1 && !url1.endsWith(".jpg") && url1 && !url1.endsWith(".jpeg"))
      tempErrors.url1 = "Image URL must end in .png, .jpg, or .jpeg";
      if (url2 && !url2.endsWith(".png") && url2 && !url2.endsWith(".jpg") && url2 && !url2.endsWith(".jpeg"))
      tempErrors.url2 = "Image URL must end in .png, .jpg, or .jpeg";
      if (url3 && !url3.endsWith(".png") && url3 && !url3.endsWith(".jpg") && url3 && !url3.endsWith(".jpeg"))
      tempErrors.url3 = "Image URL must end in .png, .jpg, or .jpeg";
      if (url4 && !url4.endsWith(".png") && url4 && !url4.endsWith(".jpg") && url4 && !url4.endsWith(".jpeg"))
      tempErrors.url4 = "Image URL must end in .png, .jpg, or .jpeg";

      const tempErrorsArray = Object.values(tempErrors);
      if (tempErrorsArray.length > 0) {
        setErrors(tempErrors);
      } else {
        dispatch(thunkCreateASpot(newSpot, imagesArray))
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
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Name of your spot"
          ></input>
        </div>
        <div className="errors">{errors.name}</div>
        <div className="form-element">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label style={{ width: "fit-content" }} htmlFor="price">
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
        <div className="errors">{errors.price}</div>
        <FormPhotos
          errors={errors}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          url1={url1}
          setUrl1={setUrl1}
          url2={url2}
          setUrl2={setUrl2}
          url3={url3}
          setUrl3={setUrl3}
          url4={url4}
          setUrl4={setUrl4}
        />
        <div className="submit-button" style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" style={{ width: "100%", marginTop: "5%", all: "unset" }}>
            Create Spot
          </button>
        </div>
      </form>
    </div>
  );
}
