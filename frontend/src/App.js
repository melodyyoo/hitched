import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";
import SpotTiles from "./components/Spot/SpotTiles";
import SpotDetails from './components/Spot/SpotDetails';
import ManageSpots from "./components/Spot/ManageSpots";

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
        <Route path='/spots/current' component={ManageSpots}/>
        <Route path='/spots/:id' component={SpotDetails}/>
      </Switch>
      }
    </>
  );
}

export default App;
