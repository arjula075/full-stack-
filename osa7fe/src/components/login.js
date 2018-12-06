import React from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { blogInitialization } from './../reducers/blogReducer'
import { loggedIn } from './../reducers/visibilityReducer'

class LoginComponent extends React.Component {

  login = async(event) => {
    try {
      event.preventDefault()
      console.log('in login props',  event.target.elements);
      console.log('in login props',  event.target.elements['username']);
      console.log('in login props',  event.target.elements['password']);

      const user = {
        'username': event.target.elements['username'].value,
        'password': event.target.elements['password'].value,
      }
      await this.props.blogInitialization(user)
      const userInProps = this.props.blogs.cachedUser
      if (userInProps && userInProps.token) {
        this.props.loggedIn()
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  render() {
    console.log('props in loging render', this.props);
    return (
      <div>
        <form onSubmit={this.login}>
          <FormGroup>
          <ControlLabel>käyttäjätunnus:</ControlLabel>
            <FormControl
            type="text"
            name="username"
            />
            <ControlLabel>salasana:</ControlLabel>
            <FormControl
            name="password"
            type="password"
            />
            <Button bsStyle="success" type="submit">kirjaudu</Button>
          </FormGroup>
        </form>
    </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    blogs: state.blog,
    visibility: state.visibility,
    notification: state.notification
  }
}

const ConnectedLoginComponent = connect(
  mapStateToProps,
  { blogInitialization, loggedIn }
)(LoginComponent)


export default ConnectedLoginComponent
