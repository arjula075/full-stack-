import React from 'react'

const User = ({user}) => {
  console.log('user', user);
  if (!user) {
    return null
  }
  const size = user.blogs.length

  return(
  <div>
    <h2>{user.username}</h2>
    <div>Blogeja: {size}</div>
  </div>
)}

export default User
