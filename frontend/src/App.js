import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";
import SpotTiles from "./components/Spot/SpotTiles";
import SpotDetails from './components/Spot/SpotDetails';
import ManageSpots from "./components/Spot/ManageSpots";
import CreateSpot from "./components/CreateSpot";
import FormWrapper from "./components/Spot/UpdateSpot/FormWrapper";
import ManageReviews from "./components/Review/ManageReviews";
import CreateBooking from "./components/Bookings/CreateBooking";
import UsersBookings from "./components/Bookings/UsersBookings";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.thunkRestoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route exact path='/'component={SpotTiles}/>
        <Route exact path='/spots/current' component={ManageSpots}/>
        <Route exact path='/spots/new' component={CreateSpot}/>
        <Route exact path='/spots/:spotId' component={SpotDetails}/>
        <Route exact path='/spots/:id/edit' component={FormWrapper}/>
        <Route exact path='/reviews/current' component={ManageReviews}/>
        <Route exact path='/bookings/current' component={UsersBookings}/>
        <Route exact path='/bookings/:spotId' component={CreateBooking}/>
      </Switch>
      }
    </>
  );
}

export default App;
