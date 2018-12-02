import React from 'react'

const Notification = (props) => {
  let message = null
  let error = null
  if (props.notification.type === 'NO_NOTIFICATION') {
    message = null
    error = null
  }
  else if (props.notification.type === 'NOTIFICATION_ON') {
    message = props.notification.notification
    error = null
  }
  else if (props.notification.type === 'ERROR_ON') {
    message = null
    error = props.notification.notification
  }
  if (message === null && error === null) {
    return null
  }
  else if (message === null) {
	  return (
		<div className="error">
		  {error}
		</div>
	  )
  }
  else {
	return (
		<div className="note">
		  {message}
		</div>
	  )
  }
}

export default Notification
