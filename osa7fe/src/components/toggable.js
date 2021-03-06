import React from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
const styles = require('./../utils/styles.js')

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
    console.log('props in toggable', props);
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
            <span><Link to={`/blogs/${props.blog._id}`}>{props.blog.title}</Link></span><span onClick={toggleVisibility}> | {props.blog.author}</span>
          </div>
          <div style={showWhenVisible}>
            <div style={styles.blogStyle()}>
              {props.children}
              <Button bsStyle="primary" bsSize="large" onClick={handleVote}>like</Button>
              <Button bsStyle="primary" bsSize="large" style={showOwn} onClick={deleteBlog}>delete</Button>
              <Button bsStyle="primary" bsSize="large" onClick={toggleVisibility}>cancel</Button>
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
