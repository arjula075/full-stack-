import React from 'react'
import Notification from '../components/notification'
import UserComponent from '../components/user'

const Footer = (props) => (
  <div>
    <Notification    notification = {props.notification}/>
    <UserComponent user = {props.blogs.cachedUser} />
  </div>
)

export default Footer
