import React from 'react'

export default function ReviewForm ({formState, onChange, onSubmit}) {
  return (
    <div>
      <label htmlFor='rating'>Rating: </label>
      <input
        name='rating'
        type='number'
        value={formState.rating}
        onChange={onChange} />
      <br />
      <label htmlFor='comment'>Comment: </label>
      <input
        name='comment'
        placeholder='Comment'
        value={formState.comment}
        onChange={onChange} />
      <br />
      <button onClick={onSubmit}>Submit</button>
    </div>
  )
}
