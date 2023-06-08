import { csrfFetch } from "./csrf";

//TYPES
const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_SINGLE_SPOT = "spots/getSingleSpot";
const CREATE_A_SPOT = "spots/createASpot";
const DELETE_A_SPOT = "spots/deleteASpot";
const UPDATE_A_SPOT = 'spots/updateASpot';

/************************************************************************************ */
//ACTION CREATORS
export const actionGetAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

export const actionGetSingleSpot = (spot) => {
    return {
        type: GET_SINGLE_SPOT,
        spot,
    };
};

//make an action creator for creating a spot
export const actionCreateASpot = (newSpot) => {
  return {
    type: CREATE_A_SPOT,
    newSpot,
  };
};

export const actionDeleteASpot = (spotId) => {
  return {
    type: DELETE_A_SPOT,
    spotId
  };
};

export const actionUpdateASpot = (updatedSpot)=>{
    return{
        type: UPDATE_A_SPOT,
        updatedSpot
    }
}


/***************************************************************************************** */
//THUNKS
export const thunkGetAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const data = await response.json();

  if (response.ok && data && data.Spots) {
    dispatch(actionGetAllSpots(data.Spots));
  }
};

export const thunkGetSingleSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  const spot = await response.json();

  if (response.ok && spot) {
    dispatch(actionGetSingleSpot(spot));
  }
};

//thunk to post to database route for spot table
export const thunkCreateASpot = (spot, imageData) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  //if res.ok, then dispatch the thunk for spotimages table
  if (res.ok) {
    const newSpot = await res.json();
    dispatch(thunkAddImagesToSpot(newSpot, imageData));
    return newSpot;
  } else {
    const errors = await res.json();
    return errors;
  }
};

//thunk to post to database route for spotimages table
export const thunkAddImagesToSpot = (newSpotData, imageData) => async (dispatch) => {
  for (const image of imageData) {
    const res = await csrfFetch(`/api/spots/${newSpotData.id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(image),
    });

    if (res.ok) {
      const newImage = await res.json();

      //attach the preview image to the result of the first thunk
      newSpotData.previewImage = newImage.url;

      //dispatch to the action creator
      dispatch(actionCreateASpot(newSpotData));

      return newSpotData;
    } else {
      const errors = await res.json();
      return errors;
    }
  }
};

export const thunkDeleteASpot = (spotId) =>async(dispatch) =>{
    const res = await csrfFetch(`/api/spots/${spotId}`,{
       method: 'DELETE'
    });

    if(res.ok){
        dispatch(actionDeleteASpot(spotId))
    }else{
        const errors = await res.json();
        return errors;
    }
}

export const thunkUpdateASpot = (spot, id) =>async(dispatch)=>{
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: "PUT",
        body: JSON.stringify(spot)
    });

    if(res.ok){
        const updatedSpot = await res.json();
        dispatch(actionUpdateASpot(updatedSpot));
        return updatedSpot;
    }else{
        const errors = await res.json();
        return errors;
    }
}

/*********************************************************************************************************** */
const initialState = { allSpots: {}, singleSpot: {} };
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      const newState = { ...state, allSpots: {} };

      action.spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });

      return newState;

    case GET_SINGLE_SPOT:
      const newSpot = { ...state, singleSpot: {} };
      newSpot.singleSpot = action.spot;

      return newSpot;

    case CREATE_A_SPOT:
      const newSpotState = { singleSpot: {}, allSpots: {} };
      //new spot is going in allSpots
      newSpotState.singleSpot = action.newSpot;
      newSpotState.allSpots[action.newSpot.id] = action.newSpot;

      return newSpotState;

    case DELETE_A_SPOT:
      const currentAllSpots = {...state.allSpots}
      delete currentAllSpots[action.spotId]
      return {...state, allSpots: currentAllSpots}

    case UPDATE_A_SPOT:
        const currentSingleSpot = {...state, singleSpot:{}};
        currentSingleSpot.singleSpot = action.updatedSpot;

        return currentSingleSpot;
    default:
      return state;
  }
};

export default spotsReducer;
