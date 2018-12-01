import React from 'react'
import PropTypes from 'prop-types'

const Toggable = (props) =>  {

  const handleVote = async(e) => {
    await props.vote(props.blog, props.user.token)
    props.notificationChange({
      notification: 'Voted for blog',
      type: 'NOTIFICATION_ON'
    }, 1)
  }

  const toggleVisibility = (e) => {
    props.toggleVisibility(props.blog)
  }

  try {
    const blogStyle = () => {
      return {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
    }
    const showWhenVisible = { display: props.blog.visibility ? '' : 'none' }
    let showOwn = {display: 'none'}

    if (props.blog.user) {
       showOwn = {display:  props.blog.user.username === props.user.username ? '' : 'none'}
    }

    const deleteBlog = async(props1) => {
      if (window.confirm('Do you really want to delete ' + props.blog.title +'?')) {
          await props.deleteBlog(props.blog, props.user.token)
          props.notificationChange({
            notification: 'Blog' + props.blog.title + ' deleted',
            type: 'NOTIFICATION_ON'
          }, 1)
      }
    }
      return (
        <div className='blogEntry'>
          <div>
            <span onClick={toggleVisibility}>{props.blog.title} {props.blog.author}</span>
          </div>
          <div style={showWhenVisible}>
            <div style={blogStyle()}>
              {props.children}
              <button onClick={handleVote}>like</button>
              <button  style={showOwn} onClick={deleteBlog}>delete</button>
              <button onClick={toggleVisibility}>cancel</button>
            </div>
          </div>
        </div>
      )
  }
  catch (e) {
    console.log(e);
  }

}

Toggable.propTypes = {
    toggleVisibility : PropTypes.func.isRequired,
    user : PropTypes.object.isRequired,
    deleteBlog : PropTypes.func.isRequired,
    vote : PropTypes.func.isRequired,
  }


export default Toggable


//<button onClick={toggleVisibility}>{props.buttonLabel}</button>
