import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationChange , notificationOff} from './../reducers/notificationReducer'

class AnecdoteForm extends React.Component {

  turnNotificationOff = () => {
    this.props.notificationOff()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.anecdote.value
    console.log('this.props',this.props);
    this.props.anecdoteCreation(value)
    this.props.notificationChange({
        notification: 'New anecdote added',
        type: 'NOTIFICATION_ON'
      })
    setTimeout(() => {
      this.props.notificationOff()
    }, 5000)
    e.target.anecdote.value = ''
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
     )
   }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    filter: state.filter
  }
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  { notificationOff, notificationChange , anecdoteCreation },
)(AnecdoteForm)

export default ConnectedAnecdoteForm
