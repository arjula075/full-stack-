import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginComponent from './components/login'
import UserComponent from './components/user'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        blogs: [],
        username: '',
        password: '',
        user: null,
        hideWhenLoggedIn: {
          display: ''
        },
        showWhenLoggedIn: {
          display: 'none'
        },
        token: null

      }
    this.handleLoginResult = this.handleLoginResult.bind(this)

  }

  componentDidMount = async() => {
    if (this.state.user) {
      const blogs = await blogService.getAll(this.state.token)
      this.setState({ blogs })
    }
  }

  handleLoginResult = async(result) => {
    console.log('result in App', result)
    let loggedInUser = null
    if (result.token) {
      loggedInUser = {
        name: result.name,
        username: result.username
      }
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
        blogs: blogs
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
      <h2>blogs</h2>
          <Blog blogs={this.state.blogs} />
    </div>
    );
  }
}

export default App;
