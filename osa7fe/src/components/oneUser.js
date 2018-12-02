import React from 'react'

const User = ({user}) => {
  return(
  <div>
    <h2>{user.username}</h2>
    <div>{user.author}</div>
  </div>
)}

export default User
