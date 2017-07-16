import React from 'react'
import { func, object } from 'prop-types'

CreateCarForm.propTypes = {
  formState: object,
  onChange: func,
  onSubmit: func
}

export default function CreateCarForm ({formState, onChange, onSubmit}) {
  return (
    <div className='form'>
      <label htmlFor='make'>Make: </label>
      <input
        name='make'
        placeholder='Make'
        value={formState.make}
        onChange={onChange} />
      <br />
      <label htmlFor='model'>Model: </label>
      <input
        name='model'
        placeholder='Model'
        value={formState.model}
        onChange={onChange} />
      <br />
      <label htmlFor='year'>Year: </label>
      <input
        name='year'
        type='number'
        value={formState.year}
        onChange={onChange} />
      <br />
      <label htmlFor='engine'>Engine: </label>
      <input
        name='engine'
        placeholder='Engine'
        value={formState.engine}
        onChange={onChange} />
      <br />
      <label htmlFor='price'>Price: </label>
      <input
        name='price'
        type='number'
        value={formState.price}
        onChange={onChange} />
      <br />
      <label htmlFor='image'>Image: </label>
      <input
        name='image'
        placeholder='URL'
        value={formState.image}
        onChange={onChange} />
      <br />
      <label htmlFor='mileage'>Mileage: </label>
      <input
        name='mileage'
        type='number'
        value={formState.mileage}
        onChange={onChange} />
      <br />
      <button onClick={onSubmit}>Create</button>
    </div>
  )
}
