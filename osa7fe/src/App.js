import React from 'react'
import Blog from './components/Blog'
import LoginComponent from './components/login'
import UserComponent from './components/user'
import NewBlogComponent from './components/newBlogs'
import UserList from './components/userList'
import User from './components/oneUser'
import SimpleBlog from './components/simpleBlog'
import Footer from './components/footer'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Table, Media, Grid, Row, Col, Image, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { connect } from 'react-redux'
import { blogInitialization, addComment } from './reducers/blogReducer'
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

    blogById = (id) => {
      console.log('id', id);
      console.log('props', this.props.blogs);
      const result = this.props.blogs.blogs.find(a => a._id === id)
      return result

    }



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
                <NavLink  to="/" activeStyle={styles.actStyle()}>Home</NavLink > &nbsp;
                <NavLink  to="/users" activeStyle={styles.actStyle()}>Users</NavLink > | &nbsp;
                <NavLink  to="/blogs" activeStyle={styles.actStyle()}>Blogs</NavLink > | &nbsp;
                <NavLink  to="/newblog" activeStyle={styles.actStyle()}>New blog</NavLink > | &nbsp;
              </div>
              <div style={this.props.visibility.showWhenLoggedIn}>
                <Route exact path="/" render={() => <Blog />} />
                <Route exact path="/users" render={() => <UserList users= {this.props.users} />} />
                <Route exact path="/users/:id" render={({match}) =>
                    <User user={this.userById(match.params.id)} />}
                />
                <Route exact path="/blogs" render={() => <Blog />} />
                <Route exact path="/blogs/:id" render={({match}) =>
                    <SimpleBlog blog={this.blogById(match.params.id)} addComment = {this.props.addComment} blogs = {this.props.blogs} notificationChange = {this.props.notificationChange} />}
                />
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
  { blogInitialization, notificationChange, loggedIn, getUsers, addComment }
)(App)
