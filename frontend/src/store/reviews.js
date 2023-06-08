//TYPES
const GET_ALL_REVIEWS = 'reviews/getAllReviews';
const GET_USERS_REVIEWS = 'reviews/getUsersReviews'

/*********************************************************************************************************** */

//ACTION CREATORS
export const actionGetAllReviews = (reviews) =>{
    return{
        type: GET_ALL_REVIEWS,
        reviews
    }
}

export const actionGetUsersReviews = (reviews)=>{
    return{
        type: GET_USERS_REVIEWS,
        reviews
    }
}

/*********************************************************************************************************** */

//THUNKS
export const thunkGetAllReviews = (spotId) => async(dispatch)=>{
    const res = await fetch(`/api/spots/${spotId}/reviews`);
    const data = await res.json();

    if(res.ok && data){
        dispatch(actionGetAllReviews(data.Reviews))
    }
}

export const thunkGetUsersReviews = () =>async(dispatch) =>{
    const res = await fetch(`/api/reviews/current`);
    const data = await res.json();

    if(res.ok && data){
        dispatch(actionGetUsersReviews(data.Reviews))
    }
}
/*********************************************************************************************************** */

//REDUCER
const initialState = {allReviews: {}, spot:{}, user:{}, bookings:{}}
const reviewsReducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_ALL_REVIEWS:
            const allReviewsState = {...state, allReviews:{}};
            action.reviews.forEach(review=>{
                allReviewsState.allReviews[review.id] = review;
            });
            return allReviewsState;
        case GET_USERS_REVIEWS:
            const usersReviewsState = {...state, user:{}};
            action.reviews.forEach(review=>{
                usersReviewsState.user[review.id] = review;
            })
            return usersReviewsState; 
        default:
            return state;
    }
}

export default reviewsReducer;
