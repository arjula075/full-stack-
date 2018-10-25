import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.anecdote.value
    console.log('value',value);
    this.props.store.dispatch(
      anecdoteCreation(value)
    )

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
