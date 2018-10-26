import React from 'react'
import { notificationChange } from './../reducers/notificationReducer'
import { notificationOff } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {

handleVote = (vote) => {
  const store = this.props.store
  store.dispatch(vote)
  store.dispatch(
    notificationChange({
      notification: 'Voted for ' + vote.id,
      type: 'NOTIFICATION_ON'
    })
  )
  setTimeout(() => {
    console.log('are we here?');
    store.dispatch(notificationOff())
  }, 5000)
}

  render() {
    const filter = this.props.store.getState().filter
    const anecdotes = this.props.store.getState().anecdote
    console.log('filter', filter);
    console.log('filter', typeof filter);

    let anecdotesToShow = anecdotes
    if (filter !== '') {
      console.log(anecdotes);
      anecdotesToShow = anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }

    console.log('anecdotesToShow', anecdotesToShow);
    console.log('anecdotesToShow', typeof anecdotesToShow);
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                this.handleVote({ type: 'VOTE', id: anecdote.id })

              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
