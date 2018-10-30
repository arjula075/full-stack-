import React from 'react'
import { connect } from 'react-redux'
import { notificationChange, notificationOff } from './../reducers/notificationReducer'
import { vote } from './../reducers/anecdoteReducer'

class AnecdoteList extends React.Component {

handleVote = (vote) => {
  this.props.vote(vote)
  this.props.notificationChange({
      notification: 'Voted for ' + vote.id,
      type: 'NOTIFICATION_ON'
    })
  setTimeout(() => {
    console.log('are we here?');
    this.props.notificationOff()
  }, 5000)
}

  render() {
    const filter = this.props.filter
    const anecdotes = this.props.anecdote
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

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { notificationOff, notificationChange , vote },
)(AnecdoteList)

export default ConnectedAnecdoteList
