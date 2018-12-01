import React from 'react'

const SimpleBlog = ({ blog }) => (
  <div>
    <div className='blogData'>
      {blog.title} {blog.author}
    </div>
    <div className='likeData'>
      blog has {blog.likes} likes
    </div>
  </div>
)

export default SimpleBlog
