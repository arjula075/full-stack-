import React from 'react';


class App extends React.Component {

  constructor(props) {
    super(props)
    console.log('App props', props);
    this.state = {
      store: props.store
    }
  }

  klik = (anecdote) => () => {
    console.log('anecdote', anecdote)
    this.props.store.dispatch({
      type: 'VOTE',
      data: anecdote
  })
    //this.props.store.dispatch({ type: nappi})
  }


  render() {
    const anecdotes = this.props.store.getState()
    anecdotes.sort(function(a, b){return b.votes - a.votes})
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.klik(anecdote)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App
