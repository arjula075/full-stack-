import React from 'react'

const Togglable = (props) =>  {

  const blogStyle = () => {
    return {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
  }

  console.log('props on toggable', props.blog.visibility)

    const hideWhenVisible = { display: props.blog.visibility ? 'none' : '' }
    const showWhenVisible = { display: props.blog.visibility ? '' : 'none' }
    const showOwn = {display:  props.blog.user.username == props.user ? '' : 'none'}

    const toggleVisibility = (props1) => {
      console.log('toggleVisibility func', props)
      props.toggleVisibility(props.blog._id)
    }

    const likePressed = (props1) => {
      console.log('likePressed toggable', props)
      props.likePressed(props.blog)
    }

    const deleteBlog = (props1) => {
      console.log('deleteBlog toggable', props, props1)
      if (window.confirm('Do you really want to delete ' + props.blog.title +'?')) { 
          props.deleteBlog(props.blog)
      }

    }

    return (
      <div >
        <div>
          <span onClick={toggleVisibility}>{props.blog.title} {props.blog.author}</span>
        </div>
        <div style={showWhenVisible}>
          <div style={blogStyle()}>
            {props.children}
            <button onClick={likePressed}>like</button>
            <button  style={showOwn} onClick={deleteBlog}>delete</button>
            <button onClick={toggleVisibility}>cancel</button>

          </div>
        </div>
      </div>
    )
  }

export default Togglable
//<button onClick={toggleVisibility}>{props.buttonLabel}</button>
