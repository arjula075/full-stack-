import React from 'react'
import { vote } from './../reducers/blogReducer'
import { notificationChange } from './../reducers/notificationReducer'
import { toggleVisibility } from './../reducers/blogReducer'
import { deleteBlog, addComment } from './../reducers/blogReducer'
import { connect } from 'react-redux'
import Header from '../components/header'
import BlogList from '../components/blogList'

class Blog extends React.Component {

    render() {
      if (this.props.blogs) {
        return (
          <div>
            <Header header='Blogs'/>
            <BlogList bloglist = {this.props.blogs} toggleVisibility = {this.props.toggleVisibility} vote = {this.props.vote} notificationChange = {this.props.notificationChange}  deleteBlog = {this.props.deleteBlog} addComment = {this.props.addComment} />
          </div>
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
  {vote, notificationChange, toggleVisibility, deleteBlog, addComment },
)(Blog)


export default ConnectedBlog
