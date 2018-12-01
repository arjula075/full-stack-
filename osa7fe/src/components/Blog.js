import React from 'react'
import { vote } from './../reducers/blogReducer'
import { notificationChange } from './../reducers/notificationReducer'
import { toggleVisibility } from './../reducers/blogReducer'
import { deleteBlog } from './../reducers/blogReducer'
import { connect } from 'react-redux'
import Toggable from '../components/toggable'
import SimpleBlog from '../components/simpleBlog'

class Blog extends React.Component {

    blogStyle = () => {
      return {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
    }

    render() {
      if (this.props.blogs) {
        return (
          this.props.blogs.blogs.map(blog => {

            return (
              <div key={blog._id} style= {this.blogStyle()} className='blogContainer'>
                <Toggable blog = {blog} user = {this.props.blogs.cachedUser} toggleVisibility = {this.props.toggleVisibility} vote = {this.props.vote} notificationChange = {this.props.notificationChange}  deleteBlog = {this.props.deleteBlog} >
                  <p>{blog.author}</p>
                  <p>{blog.title}</p>
                  <p>{blog.url}</p>
                  <p>{blog.likes}</p>
                  <SimpleBlog blog={blog}/>
              </Toggable>
            </div>
            )
            })
          )
        }
      else {
          return (
            <div></div>
            )
      }
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blog,
    visibility: state.visibility,
    notification: state.notification
  }
}

const ConnectedBlog = connect(
  mapStateToProps,
  {vote, notificationChange, toggleVisibility, deleteBlog},
)(Blog)


export default ConnectedBlog
