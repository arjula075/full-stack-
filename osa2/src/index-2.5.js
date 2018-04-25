import React from 'react'
import ReactDOM from 'react-dom'
import YksiKurssi from './components/Kurssi'

const App = () => {
  const kurssit = [{
	id: 'id0',
	nimi: 'Half Stack -sovelluskehitys',
	osat: [
	  {
		id: 'id0',
		nimi: 'Reactin perusteet',
		tehtavia: 10
	  },
	{
		id: 'id1',
		nimi: 'Tiedonvälitys propseilla',
		tehtavia: 7
	  }
	,
	{
		id: 'id2',
		nimi: 'Komponenttien tila',
		tehtavia: 14
	  }
	]
  },
  { 
	id: 'id1',
	nimi: 'NodeJS',
	osat: [
		{
			id: 'id0',
			nimi: 'Routing',
			tehtavia: 10
		},
		{	
			id: 'id1',
			nimi: 'MiddleWaret',
			tehtavia: 7
			}	
		]
	}
  ]
  return (
    <div>
      <YksiKurssi kurssit = {kurssit} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)