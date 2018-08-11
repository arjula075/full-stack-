import React from 'react'

const Togglable = (props) =>  {

  console.log('props on toggable', props.blog.visibility)

    const hideWhenVisible = { display: props.blog.visibility ? 'none' : '' }
    const showWhenVisible = { display: props.blog.visibility ? '' : 'none' }

    const toggleVisibility = (props1) => {
      console.log('toggleVisibility func', props)
      props.toggleVisibility(props.blog._id)
    }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }

export default Togglable
