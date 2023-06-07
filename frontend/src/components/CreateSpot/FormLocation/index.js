import { useState } from "react";

export default function FormLocation({city, setCity, address, setAddress, country, setCountry, state, setState, errors}) {

    return (
    <div className="form-location form-element">
      <h1>Create a new Spot</h1>
      <h2>Where's your place located?</h2>
      <p>Guests will only get your exact address once they booked a reservation.</p>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          placeholder="Country"
        //   required
        ></input>
      </label>
      <div className="errors">{errors.country}</div>
      <label>
        Street Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        //   required
        ></input>
      </label>
      <div className="city-and-state">
        <label>
          City
          <input
            style={{ width: "175%" }}
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            placeholder="City"
            // required
          ></input>
        </label>
        <label>
          State
          <input
            style={{ width: "94.6%" }}
            type="text"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
            placeholder="STATE"
            // required
          ></input>
        </label>
      </div>
    </div>
  );
}