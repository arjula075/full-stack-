import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const notes = {
      persons: [
        { name: 'Arto Hellas', puh: '123434' },
		{ name: 'Bertil Hellas', puh: '123434' },
		{ name: 'Cecilia Hellas', puh: '123434' },
		{ name: 'David Hellas', puh: '123434' },
		{ name: 'Esko Hellas', puh: '123434' },
		{ name: 'Fiona Hellas', puh: '123434' },
		
      ],
      newName: ''
    }
  

ReactDOM.render(
  <App persons={notes} />,
  document.getElementById('root')
)