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
        hideWhenLoggedIn: {
          display: ''
        },
        showWhenLoggedIn: {
          display: 'none'
        },
        token: null,
        counter: 0
      }
    this.handleLoginResult = this.handleLoginResult.bind(this)
    this.sendBlog = this.sendBlog.bind(this)

  }

  componentDidMount = async() => {

    if (this.state.user) {
      const test = await this.loginFromCache(this.state.user)
      const blogs = await blogService.getAll(this.state.token)
      this.setState({ blogs })
    }
  }

  loginFromCache = async(cachedUser) => {
    const result = await loginService.login(cachedUser)
    this.handleLoginResult(result)
  }

  successFullPost = async() => {
    const blogs = await blogService.getAll(this.state.token)
  }

  sendBlog = async(blog) => {
    console.log('in sendBlog', this.state.token);
    const result = await blogService.createBlog(blog, this.state.token)
    const newBlogs = await blogService.getAll(this.state.token)
    this.setState({blogs: newBlogs})

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
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedInUser))
    }
    else {
      return
    }
    console.log(loggedInUser)

    const blogs = await blogService.getAll(result.token)

    const pivotDisplay = this.state.hideWhenLoggedIn

    this.setState({
        hideWhenLoggedIn: this.state.showWhenLoggedIn,
        showWhenLoggedIn: pivotDisplay,
        user: loggedInUser,
        username: '',
        password: '',
        token: 'bearer ' + result.token,
        blogs: blogs,
        counter: this.state.counter + 1
      })
  }

  render() {
    let user = {'username': this.state.username, 'password': this.state.password}
    console.log('user in render',this.state.user)
    return (
    <div>
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





export default App;
