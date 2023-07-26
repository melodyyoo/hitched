import { useEffect, useState } from "react";
import ReviewRatingInput from "./ReviewRatingInput";
import { useDispatch, useSelector } from "react-redux";
import './ReviewRatingInput/ReviewRatingInput.css';
import { thunkCreateAReview } from "../../../store/reviews";
import { useModal } from "../../../context/Modal";

export default function CreateAReviewModal({spotId}){
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [errors, setErrors] = useState({});
    const [validationObject, setValidationObject] = useState({})
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const user = useSelector(state=>state.session.user);


    useEffect(()=>{
        const disabledButtonObject = {};
        if(review.length < 10)disabledButtonObject.review = 'Review must be 10 or more characters'

        if(!rating)disabledButtonObject.rating = 'Rating is required';

        setValidationObject(disabledButtonObject)
    },[rating,review]);



    const onSubmit = (e)=>{
        e.preventDefault();
        setErrors({})

        const newReview = {
            review,
            stars: rating
        };

        dispatch(thunkCreateAReview(newReview,spotId, user))
        .then(closeModal())
        .catch(async(res)=>{
            const data = await res.json();
            if(data && data.errors){
                setErrors({...data.errors, ...errors})
            }
        })
        closeModal();
    }
    const onChange = (number) => {
        setRating(parseInt(number));
      };


    return(
        <div className="post-review-form">
        <h1 style={{textAlign:'center'}}>How was your stay?</h1>
        {validationObject.review && <p style={{fontSize: 12, textAlign:'center'}}>{validationObject.review}</p>}
        <textarea required placeholder="Leave your review here..." onChange={e=>setReview(e.target.value)}></textarea>
        <ReviewRatingInput required disabled={false} rating={rating} onChange={onChange}/>
        <button onClick={onSubmit} disabled={Object.keys(validationObject).length} className="review-submit-button" type='submit'>Submit Your Review</button>
        </div>
    )
}
