import React from 'react';

const CountryList = (props) => {
		
		const countries = props.countryList
		
		if (typeof countries !== 'undefined') {
			return (
			<div>
			<h2>Countries</h2>
			{
				countries.map(country => {
				return (
					 <div key={country.name}>
						<p >{country.name}</p>
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