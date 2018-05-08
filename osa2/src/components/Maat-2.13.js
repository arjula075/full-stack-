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
		this.changeValueImp = this.changeValueImp.bind(this)
		this.onClick = this.onClick.bind(this)
	}
	
	onClick(event) {
		const value = event.target.value
		console.log(value)
		console.log(value.substring(2, value.length - 3))
		this.changeValueImp(value)
	}
	
	changeValueImp(value) {
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
	
	
	changeValue(event){
		const value = event.target.value
		this.changeValueImp(value)
		
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
				<CountryList countries={this.state.countries} onClick={this.onClick}/>
				<OneCountry oneCountry={this.state.country} />
			</div>
		)
  }
}

export default Maat