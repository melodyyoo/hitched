export default function FormDescription({ description, setDescription, errors }) {

    console.log('haha: ', errors)
  return (
    <div className="form-element" style={{ width: "100%" }}>
      <h2>Describe your place to guests</h2>
      <p>
        Mention the best features of your space, any special amentities like fast wifi or parking, and what
        you love about the neighborhood.
      </p>
      <textarea
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Please write at least 30 characters"
        // required
      ></textarea>
      <div className="errors">{errors.description}</div>
    </div>
  );
}
