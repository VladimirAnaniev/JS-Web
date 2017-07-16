import React from 'react'

export default function Review ({rating, comment}) {
  return (
    <div>
      {rating}/5 - {comment}
    </div>
  )
}
