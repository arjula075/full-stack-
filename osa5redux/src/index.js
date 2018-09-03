import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import statReducer from './statReducer'

const store = createStore(statReducer)

const renderApp = () => {
  ReactDOM.render(
      <App store={store}/>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)
