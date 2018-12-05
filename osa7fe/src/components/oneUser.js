import React from 'react'
import UserBlogList from '../components/userBlogList'

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
    <UserBlogList blogs={user.blogs} />

  </div>
)}

export default User
