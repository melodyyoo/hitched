import { csrfFetch } from "./csrf";

//TYPES
const GET_ALL_REVIEWS = 'reviews/getAllReviews';
const GET_USERS_REVIEWS = 'reviews/getUsersReviews';
const CREATE_A_REVIEW = 'reviews/createAReview';
const DELETE_A_REVIEW = 'reviews/deleteAReview';

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

export const actionCreateAReview = (review) =>{
    return{
        type: CREATE_A_REVIEW,
        review
    }
};

export const actionDeleteAReview = (reviewId) =>{
    return{
        type: DELETE_A_REVIEW,
        reviewId
    }
}
/*********************************************************************************************************** */

//THUNKS
export const thunkGetAllReviews = (spotId) => async(dispatch)=>{
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await res.json();

    if(res.ok && data){
        dispatch(actionGetAllReviews(data.Reviews))
    }
}

export const thunkGetUsersReviews = () =>async(dispatch) =>{
    const res = await csrfFetch(`/api/reviews/current`);
    const data = await res.json();

    if(res.ok && data){
        dispatch(actionGetUsersReviews(data.Reviews))
    }
}

export const thunkCreateAReview = (newReview, spotId, user)=>async(dispatch)=>{
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(newReview)
    });

    if(res.ok){
        const newReview = await res.json();
        newReview.User = user;
        dispatch(actionCreateAReview(newReview));
        return newReview
    }else{
        const errors = await res.json();
        return errors;
    }
};

export const thunkDeleteAReview = (reviewId) => async(dispatch) =>{
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method:'DELETE'
    });
    if(res.ok){
        dispatch(actionDeleteAReview(reviewId))
    }else{
        const errors = await res.json();
        return errors;
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
        case CREATE_A_REVIEW:
            const createReviewState = {...state, spot:{}, allReviews:{...state.allReviews}};
            createReviewState.spot[action.review.id] = action.review;
            createReviewState.allReviews[action.review.id] = action.review;
            return createReviewState;
        case DELETE_A_REVIEW:
            const deleteReviewState = {...state.allReviews};
            delete deleteReviewState[action.reviewId];
            return {...state, allReviews: deleteReviewState}
        default:
            return state;
    }
}

export default reviewsReducer;
