import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationChange } from './../reducers/notificationReducer'
import { notificationOff } from './../reducers/notificationReducer'

class AnecdoteForm extends React.Component {

  turnNotificationOff = () => {
    console.log('here');
    this.props.store.dispatch(
      notificationOff()
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const store = this.props.store
    const value = e.target.anecdote.value
    console.log('value',value);
    store.dispatch(
      anecdoteCreation(value)
    )
    store.dispatch(
      notificationChange({
        notification: 'New anecdote added',
        type: 'NOTIFICATION_ON'
      })
    )
    setTimeout(() => {
      console.log('are we here?');
      store.dispatch(notificationOff())
    }, 1000)


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

export default AnecdoteForm
