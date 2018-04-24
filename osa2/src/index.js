import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = {
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
	  },
	{
		id: 'id2',
		nimi: 'Komponenttien tila',
		tehtavia: 14
	  }
  ]
  }
  return (
    <div>
      <Otsikko kurssi = {kurssi} />
      <Sisalto kurssi = {kurssi} />
      <Yhteensa kurssi = {kurssi}/>
    </div>
  )
}

const Otsikko = (props) => {

console.log(props);
const kurssi = props.kurssi.nimi;

	return (
	<div>
		<h1>{kurssi}</h1>
	</div>
	)
}

const Sisalto = (props) => {
	
	console.log(props);
	const sis = props.kurssi.osat

	return (
		<div>
		{
			sis.map(osa => {
			return <p key={osa.id}>{osa.nimi} {osa.tehtavia}</p>;
			}
		)
		}
		</div>
	)

	
}

const Yhteensa = (props) => {
	
	console.log(props);
	let x = 0;
	
	props.kurssi.osat.forEach((osa) => 
		{
			x = x + osa.tehtavia;
		}
	) 

	
	return (
	<div>
		<p>yhteensä {x} tehtävää</p>
	</div>
	)
	
	
	
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)