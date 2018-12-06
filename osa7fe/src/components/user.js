import React from 'react'
import {  Button  } from 'react-bootstrap'
const utils = require('../utils/utils.js')

const UserComponent = (props) => {

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
        käyttäjätunnus: {loggedInUser.username} | Käyttäjän nimi:  {loggedInUser.name}
        <p>
        <Button onClick={logOut}>
          kirjaudu ulos
        </Button>
        </p>
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

const logOut = () => {
  console.log('in logout');
  utils.logOut()
}

export default UserComponent
