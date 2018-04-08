import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
	  {
		nimi: 'Reactin perusteet',
		tehtavia: 10
	  },
	{
		nimi: 'Tiedonvälitys propseilla',
		tehtavia: 7
	  },
	{
		nimi: 'Komponenttien tila',
		tehtavia: 14
	  }
  ]


  return (
    <div>
      <Otsikko otsikko = {kurssi} />
      <Sisalto osat = {osat} />
      <Yhteensa osat = {osat}/>
    </div>
  )
}

const Otsikko = (props) => {

	return (
	<div>
		<h1>{props.otsikko}</h1>
	</div>
	)
}

const Sisalto = (props) => {
	
	
	const sis = props.osat

	return (
		<div>{
			sis.map(osa => {
			return <p>{osa.nimi} {osa.tehtavia}</p>;
			}
		)
		}
		</div>
	)

	
}

const Yhteensa = (props) => {
	
	let x = 0;
	props.osat.forEach((osa) => 
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
