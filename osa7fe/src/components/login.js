import React from 'react'
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
    let userName = ''
    let password = ''
    if (this.props.blogs.cachedUser) {
      userName = this.props.blogs.cachedUser.username
      password = this.props.blogs.cachedUser.password
    }
    return (
      <div>
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
                name="username"
                //value={userName}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              //value={password}
            />
            <p></p>
          </div>
          <button type="submit">kirjaudu</button>
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
