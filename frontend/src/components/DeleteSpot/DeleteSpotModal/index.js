import { useDispatch } from "react-redux";
import { thunkDeleteASpot } from "../../../store/spots";
import { useModal } from "../../../context/Modal";

export default function DeleteSpotModal({id}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const onSubmit = async()=>{
        dispatch(thunkDeleteASpot(id))
    }

  return (
    <form style={{margin:" 0px 20px 30px 20px"}} onSubmit={onSubmit}>
      <h1 style={{textAlign:'center'}}>Confirm Delete</h1>
      <p style={{margin: "0 20px", position: 'relative', top: -13}} >Are you sure you want to remove this spot from the listings?</p>
      <button type='submit'>Yes (Delete Spot)</button>
      <button type='button' onClick={closeModal}>No (Keep Spot)</button>
    </form>
  );
}
