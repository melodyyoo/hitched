export default function FormPhotos({previewUrl, setPreviewUrl, url1, setUrl1, url2, setUrl2, url3, setUrl3, url4, setUrl4, errors}) {


  return (
    <div className="form-element">
      <h2>Liven up your spot with photos</h2>
      <p>Submit a link to at least one photo to publish your spot.</p>
      <div>
        <input type='url' onChange={e=> setPreviewUrl(e.target.value)} value={previewUrl} required placeholder="Preview Image URL"></input>
        <div className="errors">{errors.previewUrl}</div>
        <input className="form-photos-input" type='url' onChange={e=> setUrl1(e.target.value)} value={url1} placeholder="Image URL"></input>
        <div className="errors">{errors.url1}</div>
        <input className="form-photos-input" type='url' onChange={e=> setUrl2(e.target.value)} value={url2} placeholder="Image URL"></input>
        <div className="errors">{errors.url2}</div>
        <input className="form-photos-input" type='url' onChange={e=> setUrl3(e.target.value)} value={url3} placeholder="Image URL"></input>
        <div className="errors">{errors.url3}</div>
        <input className='form-photos-input' type='url' onChange={e=> setUrl4(e.target.value)} value={url4} placeholder="Image URL"></input>
        <div className="errors">{errors.url4}</div>
     </div>
    </div>
  );
}
