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
    console.log('this.props', this.props);
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                this.handleVote({ type: 'VOTE', id: anecdote.id, votes: anecdote.votes })

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

const anecdotesToShow = (anecdotes, filter) => {
  console.log('filter', filter);
  if (filter !== '') {
    console.log(anecdotes);
    return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  }
  else {
    return anecdotes
  }
}


const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state.anecdote, state.filter)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { notificationOff, notificationChange , vote },
)(AnecdoteList)

export default ConnectedAnecdoteList
