import React from 'react'

const SimpleBlog = ({ blog }) => {
  console.log('blog in simpleBlog', blog);
  if (!blog) {
    return null
  }
  return (
      <div>
        <div className='blogData'>
          {blog.title} {blog.author}
        </div>
        <div className='likeData'>
          blog has {blog.likes} likes
        </div>
      </div>
  )

}

export default SimpleBlog
