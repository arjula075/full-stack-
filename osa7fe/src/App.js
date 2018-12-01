import React from 'react'
import Blog from './components/Blog'
import LoginComponent from './components/login'
import UserComponent from './components/user'
import NewBlogComponent from './components/newBlogs'
import { connect } from 'react-redux'
import { blogInitialization } from './reducers/blogReducer'
import { loggedIn } from './reducers/visibilityReducer'
import { notificationChange } from './reducers/notificationReducer'
const utils = require('./utils/utils.js')

class App extends React.Component {

  componentDidMount = async() => {
      const cachedUser = utils.getUserFromMemory()
      await this.props.blogInitialization(cachedUser)
      const user = this.props.blogs.cachedUser
      if (user && user.token) {
        this.props.loggedIn()
      }
    }

  render() {
    console.log('props in app', this.props);
    let message = ''
    let error = ''
    if (this.props.notification.type === 'NO_NOTIFICATION') {
      message = ''
      error = ''
    }
    else if (this.props.notification.type === 'NOTIFICATION_ON') {
      message = this.props.notification.notification
      error = ''
    }
    else if (this.props.notification.type === 'ERROR_ON') {
      message = ''
      error = this.props.notification.notification
    }
    try {
      return (
      <div>
        <Notification    message={message} error={error}/>
        <div style={this.props.visibility.hideWhenLoggedIn}>
          <LoginComponent />
        </div >
        <div  style={this.props.visibility.showWhenLoggedIn}>
          <UserComponent user={this.props.blogs.cachedUser} />
        </div>
        <div>
          <h2>blogs</h2>
              <Blog />
        </div>
        <div style={this.props.visibility.showWhenLoggedIn}>
          <NewBlogComponent/>
        </div>
      </div>
      )
    }
    catch (e) {
      console.log(e)
      return null
    }
  }
}

const Notification = ({ message, error }) => {
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

const mapStateToProps = (state) => {
  console.log('App mapStateToProps',state);
  return {
    blogs: state.blog,
    visibility: state.visibility,
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  { blogInitialization, notificationChange, loggedIn }
)(App)
