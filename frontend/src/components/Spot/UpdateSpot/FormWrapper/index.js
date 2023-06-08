import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetSingleSpot } from "../../../../store/spots";
import UpdateSpot from "..";

export default function FormWrapper() {
  const { id } = useParams();
  const newSpot = useSelector((state) => state.spots.singleSpot);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(thunkGetSingleSpot(parseInt(id)));
  }, [dispatch, id]);



  if (!newSpot.SpotImages) return null;

  return <UpdateSpot newSpot={newSpot} id={id} />;
}
