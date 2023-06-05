import "./SpotTile.css";

const SpotTile = ({previewImage, location, price, avgRating}) =>{
    const image = (previewImage === 'No preview image available') ?
    <div style={{width:250, height:200, border:'solid black 1px', display:'flex', justifyContent:'center', alignItems:'center'}}>
        {previewImage}
    </div> : <img src={previewImage} alt='Spot Image'/>
    return(
        <>
        <div className="spot-tile">
            {image}
            <div className="location-and-rating">
                <p>{location}</p>
                <p>{avgRating}</p>
            </div>
            <p>${price} per day</p>
        </div>
        </>
    )
}

export default SpotTile;
