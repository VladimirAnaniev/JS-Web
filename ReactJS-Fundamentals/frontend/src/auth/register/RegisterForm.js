import React from 'react'

export default function RegisterForm ({formState, onChange, onSubmit}) {
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
      <label htmlFor='name'>Name: </label>
      <input
        name='name'
        type='text'
        placeholder='Name'
        value={formState.name}
        onChange={onChange} />
      <br />
      <button onClick={onSubmit}>Register</button>
    </div>
  )
}
