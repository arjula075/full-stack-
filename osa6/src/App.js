import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterForm from './components/Filter'

class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification  />
        <AnecdoteList />
        <AnecdoteForm />
        <FilterForm />

      </div>
    )
  }
}

export default App
