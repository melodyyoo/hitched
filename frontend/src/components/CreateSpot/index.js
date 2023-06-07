import "./CreateSpot.css";
import FormLocation from "./FormLocation";
import FormDescription from "./FormDescription";
import FormPhotos from "./FormPhotos";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { thunkCreateASpot } from "../../store/spots";

export default function CreateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [url3, setUrl3] = useState('');
  const [url4, setUrl4] = useState('');
  const [errors, setErrors] = useState({});
  const newNewSpot = useSelector(state=> state.spots.singleSpot);

  console.log('newnewSpotId: ', newNewSpot)

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
        price
    }

    //create a separate object for the image url
    const imagesArray = [{
        url: previewUrl, preview: true
    }, {url: url1, preview:false}, {url:url2, preview:false},
    {url: url3, preview:false}, {url:url4, preview:false}
    ]

    if(!address) errors.address = 'Address is required';
    if(!city) errors.city = 'City is required';
    if(!state) errors.state = 'State is required';
    if(!country)errors.country = 'Country is required';
    if(!title)errors.name = 'Name is required';
    if(!price)errors.price = 'Price is required';
    if(description.length < 30) errors.description = 'Description needs a minimum of 30 characters';

    if(!previewUrl) errors.previewUrl = 'Preview image is required';

    if(url1 && !url1.endsWith('.png') || url1 && !url1.endsWith('.jpg') || url1&& !url1.endsWith('.jpeg'))errors.url1 ='Image URL must end in .png, .jpg, or .jpeg'
    if(url2 && !url2.endsWith('.png') || url2 && !url2.endsWith('.jpg') || url2 && !url2.endsWith('.jpeg'))errors.url2 ='Image URL must end in .png, .jpg, or .jpeg'
    if(url3 && !url3.endsWith('.png') || url3 &&!url3.endsWith('.jpg') || url3&& !url3.endsWith('.jpeg'))errors.url3 ='Image URL must end in .png, .jpg, or .jpeg'
    if(url4 && !url4.endsWith('.png') || url4 && !url4.endsWith('.jpg') || url4&&!url4.endsWith('.jpeg'))errors.url4 ='Image URL must end in .png, .jpg, or .jpeg'


    if(!Object.keys(errors).length > 0){
        //invoke the thunk to post to db route for spot table
        dispatch(thunkCreateASpot(newSpot, imagesArray))
        .catch(async(res)=>{
            const data = await res.json();
            if(data && data.errors){
                setErrors({...data.errors, ...errors});
            }

        });
        history.push(`/spots/${newNewSpot.id}`);
    }

};


  return (
    <div className="create-form-outer-container">
      <form className="create-form-inner-container" onSubmit={onSubmit}>
        <FormLocation errors={errors} city={city} setCity={setCity} state={state} setState={setState}
        address={address} setAddress={setAddress} country={country} setCountry={setCountry}
        />
        <FormDescription errors={errors} description={description} setDescription={setDescription}/>
        <div className="form-element spot-title">
          <h2>Create a title for your spot</h2>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input type='text' onChange={e=>setTitle(e.target.value)} value={title} placeholder="Name of your spot" required></input>
        </div>
        <div className="form-element">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <label>
            $<input type='text' onChange={e=>setPrice(e.target.value)} value={price} required placeholder="Price per night (USD)"></input>
          </label>
        </div>
        <FormPhotos errors={errors} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl}
            url1={url1} setUrl1={setUrl1} url2={url2} setUrl2={setUrl2} url3={url3}
            setUrl3={setUrl3} url4={url4} setUrl4={setUrl4}
        />
        <div className="submit-button" style={{ display: "flex", alignItems: "center" }}>
          <button type="submit" style={{ width: "25%", marginTop: "5%" }}>
            Create Spot
          </button>
        </div>
      </form>
    </div>
  );
}
