import React from 'react'
import ReactDOM from 'react-dom'

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

const Otsikko = (props) => {

console.log(props);
const kurssi = props.kurssi.nimi;

	return (
	<div>
		<h1>{kurssi}</h1>
	</div>
	)
}

const YksiKurssi = (props) => {
	console.log(props);

		return (
		<div>
		{
			props.kurssit.map(osa => {
			return (
				    <div key={osa.id}>
						<Otsikko kurssi = {osa} />
						<Sisalto kurssi = {osa} />
						<Yhteensa kurssi = {osa}/>
					</div>
					)
			}
		)
		}
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
	let x = props.kurssi.osat.reduce(getSum, 0);

	
	return (
	<div>
		<p>yhteensä {x} tehtävää</p>
	</div>
	)
	
	
	
}

function getSum(total, num) {
	console.log('total', total)
	console.log('num', num)
    return total + num.tehtavia;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)