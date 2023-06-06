import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SINGLE_SPOT = 'spots/getSingleSpot';


export const actionGetAllSpots  = (spots) =>{
    return{
        type: GET_ALL_SPOTS,
        spots
    }
}

export const actionGetSingleSpot = (spot) =>{
    return{
        type: GET_SINGLE_SPOT,
        spot
    }
}

export const thunkGetAllSpots = () => async(dispatch) =>{
    const response = await csrfFetch("/api/spots");
    const data = await response.json();

    if(response.ok && data && data.Spots){
        dispatch(actionGetAllSpots(data.Spots))
    }

}

export const thunkGetSingleSpot = (id) => async(dispatch) =>{
    const response = await csrfFetch(`/api/spots/${id}`);
    const spot = await response.json();


    if(response.ok && spot){
        dispatch(actionGetSingleSpot(spot))
    }
}


const initialState = {allSpots: {}, singleSpot:{}}
const spotsReducer = (state= initialState, action) =>{
    switch(action.type){
        case GET_ALL_SPOTS:
            const newState = {...state, allSpots:{}};

            action.spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot;
              });

            return newState

        case GET_SINGLE_SPOT:
            const newSpot = {...state, singleSpot:{}};
            newSpot.singleSpot = action.spot;


            return newSpot;
        default:
            return state;
    }
}

export default spotsReducer;
