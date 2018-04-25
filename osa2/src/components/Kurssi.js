import React from 'react';

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

export default YksiKurssi