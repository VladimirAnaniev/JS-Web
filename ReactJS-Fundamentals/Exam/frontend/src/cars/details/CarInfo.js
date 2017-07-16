import React from 'react'

export default function CarInfo ({car}) {
  return (
    <div>
      <p>Make - {car.make}</p>
      <p>Model - {car.model}</p>
      <p>Year - {car.year}</p>
      <p>Engine - {car.engine}</p>
      <p>Price - {car.price}</p>
      <p>Image - <img src={car.image} alt={car.make} /></p>
      {car.mileage && <p>Mileage - {car.mileage}</p>}
      <p>Likes - {car.likes}</p>
    </div>
  )
}
