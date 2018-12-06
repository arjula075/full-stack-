import React from 'react'
import Comments from '../components/comments'
import { Button } from 'react-bootstrap'

const SimpleBlog = (props) => {
  console.log('blog in simpleBlog', props.blog);
  if (!props.blog) {
    return null
  }
  const addComment = async(event) => {
    try {
      event.preventDefault()
      const comment = {
        'comment': event.target.elements['comment'].value,
      }
      event.target.reset()
      console.log('this props in simpleBlog', props);
      await props.addComment(comment, props.blog._id, props.blogs.cachedUser.token)
      props.notificationChange({
        notification: 'New comment added',
        type: 'NOTIFICATION_ON'
      }, 1)
    }
    catch (e) {
      console.log(e);
    }
  }

  const blog = props.blog
  return (
      <div>
        <div className='blogData'>
          {blog.title} {blog.author}
        </div>
        <div className='likeData'>
          blog has {blog.likes} likes
        </div>
        <Comments comments={blog.comments} />
        <div>
        <form onSubmit={addComment}>
          <div>
            add comment
            <input
              type="text"
                name="comment"
                />
          </div>
          <Button bsStyle="primary" bsSize="large" type="submit">add comment</Button>
        </form>
        </div>
      </div>
  )

}

export default SimpleBlog
