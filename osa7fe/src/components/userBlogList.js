import React from 'react'

const UserBlogList = ({blogs}) => {
    console.log('blogs', blogs);
    if (!blogs) {
      return null
    }
    return(
      blogs.map(blog => {
        return (
          <div>
            <span> {blog.title } </span>
            <span>by {blog.author}</span>
          </div>
        )
      }
    )
  )
}

export default UserBlogList
