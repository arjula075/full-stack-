import React from 'react'

const UserComponent = (props) => {

    console.log('props', props)
    let loggedInUser = {}
    if (props.user) {
        loggedInUser = props.user
    }
    else {
        loggedInUser = null
    }

    if (loggedInUser) {
    return (
      <div>
        {loggedInUser.username} {loggedInUser.name}
      </div>
    )
  }
  else {
    return (
      <div>
        no user
      </div>
      )
    }

}

export default UserComponent
