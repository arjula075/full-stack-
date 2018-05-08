import React from 'react';

const CountryList = (props) => {
		console.log('p2', props)
		const {countries, onClick} = props
		console.log('countries', countries)
		
		if (typeof countries !== 'undefined') {
			return (
			<div>
			<h2>Countries</h2>
			{
				countries.map(country => {
				return (
					 <div key={country.name} >
						<button type="button" value={country.name} onClick={onClick}>{country.name}</button>
					 </div>
					)
				}
			)
			}
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

export default CountryList