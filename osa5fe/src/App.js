// No, 5.5 tulikin tehtyä heti kärkeen

import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginComponent from './components/login'
import UserComponent from './components/user'
import NewBlogComponent from './components/newBlogs'
import loginService from './services/login'
const utils = require('./utils/utils.js')

class App extends React.Component {
  constructor(props) {
    super(props)
    const cachedUser = utils.getUserFromMemory()
    console.log('cachedUser', cachedUser);
    this.state = {
        blogs: [],
        username: '',
        password: '',
        user: cachedUser,
        hideWhenLoggedIn: utils.displayNormal(),
        showWhenLoggedIn: utils.displayNone(),
        token: null,
        counter: 0,
        fetchedPassword: cachedUser ? cachedUser.password : null,
      }
    this.handleLoginResult = this.handleLoginResult.bind(this)
    this.sendBlog = this.sendBlog.bind(this)
    this.setNotification = this.setNotification.bind(this)
    this.clearmessages = this.clearmessages.bind(this)

  }

  componentDidMount = async() => {

    if (this.state.user) {
      const test = await this.loginFromCache(this.state.user)
      const blogs = await blogService.getAll(this.state.token)
      this.setState({ blogs })
    }
  }

  loginFromCache = async(cachedUser) => {
    try {
      const result = await loginService.login(cachedUser)
      this.handleLoginResult(result)
      this.setNotification('kirjautuminen onnistui')
    }
    catch(e) {
      this.setNotification('NA', 'kirjautuminen epäonnistui')
    }
    const result = await loginService.login(cachedUser)
    this.handleLoginResult(result)
  }

  successFullPost = async() => {
    const blogs = await blogService.getAll(this.state.token)
  }

  sendBlog = async(blog) => {
    console.log('in sendBlog', this.state.token);
    const result = await blogService.createBlog(blog, this.state.token)
    try {
      const newBlogs = await blogService.getAll(this.state.token)
      this.setState({blogs: newBlogs})
      this.setNotification('Good job')
    }
    catch (e) {
      console.log(e)
      this.setNotification('NA', 'failed')
    }
  }

  clearmessages() {
  this.setState({
    successtext: null,
    errortext: null
  })
}

  handleLoginResult = async(result) => {
    console.log('result in App', result)
    let loggedInUser = null
    if (result.token) {
      loggedInUser = {
        name: result.name,
        username: result.username,
        password: result.password
      }
      utils.setUserToMemory(loggedInUser)

    }
    else {
      return
    }
    console.log(loggedInUser)

    const blogs = await blogService.getAll(result.token)

    this.setState({
        hideWhenLoggedIn: utils.displayNone(),
        showWhenLoggedIn: utils.displayNormal(),
        user: loggedInUser,
        username: '',
        password: '',
        token: 'bearer ' + result.token,
        blogs: blogs,
        counter: this.state.counter + 1,
      })

  }

  setNotification = (notification, error) => {
    console.log('in notification', notification)
    if (!error) {
    this.setState({
  					successtext: notification
  				})

  				setTimeout(() => {
  					this.clearmessages()
  				}, 3000)
  	}
  	else {
  				console.log(error)
  				this.setState({
  					errortext: error
  				})
  				setTimeout(() => {
  					this.clearmessages()
  				}, 3000)
  		}
  }

  render() {
    let user = {'username': this.state.username, 'password': this.state.password}
    console.log('user in render',this.state.user)
    console.log('state in render',this.state)
    return (
    <div>
      <Notification message={this.state.successtext} error={this.state.errortext} />
      <div style={this.state.hideWhenLoggedIn}>
        <LoginComponent user={user} loginHandle = {this.handleLoginResult}/>
      </div >
      <div  style={this.state.showWhenLoggedIn}>
        <UserComponent user={this.state.user} />
      </div>
      <div>
        <h2>blogs</h2>
            <Blog blogs={this.state.blogs} />
      </div>
      <div style={this.state.showWhenLoggedIn}>
        <NewBlogComponent token={this.state.token} counter={this.state.counter} sendBlog={this.sendBlog}/>
      </div>
    </div>
    );
  }
}

const Notification = ({ message, error }) => {
	console.log(message, error)
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

export default App;
