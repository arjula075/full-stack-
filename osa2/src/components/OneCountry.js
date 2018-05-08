import React from 'react';

const OneCountry = (props) => {
		
		console.log('props', props)
		const country = props.oneCountry
		
		if (typeof country !== 'undefined') {
			return (
			<div>
			<h2>{country.name}</h2>
			<div>capital: {country.capital}</div>
			<div>population: {country.population}</div>
			<div><img src={country.flag} /></div>
			</div>
			)
		}
		else {
			return (
				<div>
				</div>
			)
		}
		
}

export default OneCountry