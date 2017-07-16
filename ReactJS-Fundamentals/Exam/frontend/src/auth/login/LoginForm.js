import React from 'react'
import { func, object } from 'prop-types'

LoginForm.propTypes = {
  formState: object,
  onChange: func,
  onSubmit: func
}

export default function LoginForm ({formState, onChange, onSubmit}) {
  return (
    <div className='form'>
      <label htmlFor='email'>Email: </label>
      <input
        name='email'
        type='email'
        placeholder='Email'
        value={formState.email}
        onChange={onChange} />
      <br />
      <label htmlFor='password'>Password: </label>
      <input
        name='password'
        type='password'
        placeholder='Password'
        value={formState.password}
        onChange={onChange} />
      <br />
      <button onClick={onSubmit}>Login</button>
    </div>
  )
}
