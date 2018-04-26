import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const notes = {
      persons: [
        { name: 'Arto Hellas', puh: '123434' }
      ],
      newName: ''
    }
  

ReactDOM.render(
  <App persons={notes} />,
  document.getElementById('root')
)