import React from 'react'
import Togglable from '../components/toggable'

const Blog = (props) =>  {

    console.log('props in blog const', props);

    const blogs = props.blogs

    const label = 'Näytä tiedot'

  const blogStyle = () => {
    return {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
  }

  const toggleVisibility = (props1) => {
    console.log('toggleVisibility func', props)
    props.toggleVisibility(props1.blog._id)
  }

  if (blogs) {
    console.log(blogs)
    return (
      blogs.map(blog => {

        return (<div key={blog._id} style={blogStyle()}>
          <Togglable blog={blog} toggleVisibility={props.toggleVisibility} likePressed={props.likePressed} buttonLabel ={blog.title} >
              <p>{blog.author}</p>
              <p>{blog.title}</p>
              <p>{blog.url}</p>
              <p>{blog.likes}</p>
          </Togglable>
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

export default Blog
