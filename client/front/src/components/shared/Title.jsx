import React from 'react'

 const Title = ({Title="strivo",description="this is my chat app"}) => {
  return (
    <div className="title">
      <h1>{Title}</h1>
      <p>{description}</p>
    </div>
  )
}
 export default Title
