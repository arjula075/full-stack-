import React from 'react'
const Blog = (props) => {

  console.log('props in blog', props)

  if (props.blogs) {
    return (
      props.blogs.map(blog => {
        return (<div key={blog._id}>
          {blog.title} {blog.author}
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
