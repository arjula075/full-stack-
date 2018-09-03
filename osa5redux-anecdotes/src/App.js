import React from 'react';


class App extends React.Component {

  constructor(props) {
    super(props)
    console.log('App props', props);
    this.state = {
      store: props.store,
      inputValue: ''
    }
    this.changeValue = this.changeValue.bind(this)
  }

  changeValue(event){
    event.preventDefault()
    this.setState({
      inputValue: event.target.value
     })
     return false
  }


  klik = (anecdote, type) => () => {
    console.log('anecdote', anecdote)
    if (type === 'CREATE') {
      const inputValue = anecdote
      anecdote = {
        content: inputValue,
        id: 0,
        votes: 0
      }
    }
    this.props.store.dispatch({
      type: type,
      data: anecdote
  })
    //this.props.store.dispatch({ type: nappi})
  }


  render() {
    const anecdotes = this.props.store.getState()
    console.log('anecdotes', anecdotes);
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
              <button onClick={this.klik(anecdote, 'VOTE')}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input value={this.state.inputValue} onChange={this.changeValue}/></div>
          <button type='button' onClick={this.klik(this.state.inputValue, 'CREATE')}>create</button>
        </form>
      </div>
    )
  }
}

export default App
