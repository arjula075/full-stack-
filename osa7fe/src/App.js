import React from 'react'
import Blog from './components/Blog'
import LoginComponent from './components/login'
import UserComponent from './components/user'
import NewBlogComponent from './components/newBlogs'
import UserList from './components/userList'
import User from './components/oneUser'
import Footer from './components/footer'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Table, Media, Grid, Row, Col, Image, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { connect } from 'react-redux'
import { blogInitialization } from './reducers/blogReducer'
import { loggedIn } from './reducers/visibilityReducer'
import { getUsers } from './reducers/usersReducer'
import { notificationChange } from './reducers/notificationReducer'
const utils = require('./utils/utils.js')
const styles = require('./utils/styles.js')


class App extends React.Component {

  componentDidMount = async() => {
      const cachedUser = utils.getUserFromMemory()
      await this.props.blogInitialization(cachedUser)
      const user = this.props.blogs.cachedUser
      if (user && user.token) {
        await this.props.getUsers(user.token)
        this.props.loggedIn()
      }
    }

    userById = (id) =>
      this.props.users.find(a => a.id === id)

  render() {
    console.log('props in app', this.props);
    try {
      return (
        <div className="container">
          <Router>
            <div>
              <div style={this.props.visibility.hideWhenLoggedIn}>
                <LoginComponent />
              </div >
              <div style={styles.navStyle(this.props.visibility.showWhenLoggedIn)}>
                <NavLink  to="/" activeStyle={styles.actStyle()}>home</NavLink > &nbsp;
                <NavLink  to="/users" activeStyle={styles.actStyle()}>user</NavLink > | &nbsp;
                <NavLink  to="/blogs" activeStyle={styles.actStyle()}>blogs</NavLink > | &nbsp;
                <NavLink  to="/newblog" activeStyle={styles.actStyle()}>new blog</NavLink > | &nbsp;
              </div>
              <div style={this.props.visibility.showWhenLoggedIn}>
                <Route exact path="/" render={() => <Blog />} />
                <Route exact path="/users" render={() => <UserList users= {this.props.users} />} />
                <Route exact path="/users/:id" render={({match}) =>
                    <User user={this.userById(match.params.id)} />}
                />
                <Route path="/blogs" render={() => <Blog />} />
                <Route path="/newblog" render={() => <NewBlogComponent />} />
                <Footer notification = {this.props.notification}  blogs = {this.props.blogs}/>
              </div>
            </div>
          </Router>
        </div>
      )
    }
    catch (e) {
      console.log(e)
      return null
    }
  }
}

const mapStateToProps = (state) => {
  console.log('App mapStateToProps',state);
  return {
    blogs: state.blog,
    visibility: state.visibility,
    notification: state.notification,
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  { blogInitialization, notificationChange, loggedIn, getUsers }
)(App)
