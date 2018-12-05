import React from 'react'
import Toggable from '../components/toggable'
import SimpleBlog from '../components/simpleBlog'
const styles = require('./../utils/styles.js')

const BlogList = (props) => {
  return(
    props.bloglist.blogs.map(blog => {
      return (
        <div key={blog._id} style= {styles.blogStyle()} className='blogContainer'>
          <Toggable blog = {blog} user = {props.bloglist.cachedUser} toggleVisibility = {props.toggleVisibility} vote = {props.vote} notificationChange = {props.notificationChange}  deleteBlog = {props.deleteBlog} >
            <p>{blog.author}</p>
            <p>{blog.title}</p>
            <p>{blog.url}</p>
            <p>{blog.likes}</p>
            <SimpleBlog blog={blog} addComment = {props.addComment} blogs = {props.bloglist} notificationChange = {props.notificationChange}/>
          </Toggable>
        </div>
      )
    })
)}

export default BlogList
