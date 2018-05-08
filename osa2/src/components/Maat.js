import React from 'react';
import personService from '../service/persons'
import CountryList from './CountryList'
import OneCountry from './OneCountry'



class Maat extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			inputValue: props.inputValue
		}
		this.changeValue = this.changeValue.bind(this)
	
	}
	
	
	changeValue(event){
		const value = event.target.value
		this.setState({
			inputValue: value
		 })
		 personService
		 .getCountries(value)
		 .then(countries =>
		{
			console.log(countries.length)
			if (countries.length > 10) {
				this.setState({
					tooMany : 'liian monta'
				})
			}
			else if (countries.length > 1) {
				this.setState({
					tooMany : '',
					countries: countries 
				})
				
			}
			else if (countries.length === 1) {
				this.setState({
					inputValue: value,
					countries: undefined,
					country: countries[0]
				})
				
			}
			else {
				this.setState({
					inputValue: value,
					countries: undefined,
					tooMany: 'ei yhtään'
				})
			}
		})
  }

	render() {
		return (
			<div>
				<h2>Maat</h2>
				<form onSubmit={this.onSubmit}>
				<div>
					löydä maa: <input value={this.state.inputValue} onChange={this.changeValue}/>
				</div>
				</form>
				<div>{this.state.tooMany}</div>
				<CountryList countryList={this.state.countries} />
				<OneCountry oneCountry={this.state.country} />
			</div>
		)
  }
}

export default Maat