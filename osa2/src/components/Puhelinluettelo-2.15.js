// 20 min 26.04
import React from 'react';
import Numerot from './Numerot'
import HakuLomake from './HakuLomake'
import personService from '../service/persons'
import axios from 'axios'

class PuhelinLuettelo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
		persons: props.persons,
		inputValue: props.inputValue,
		hakuEhto: ''
    }
	this.onSubmit = this.onSubmit.bind(this)
	this.changeValue = this.changeValue.bind(this)
	this.changePuhValue = this.changePuhValue.bind(this)
	this.changeHakuValue = this.changeHakuValue.bind(this)
	this.checkHakuEhto = this.checkHakuEhto.bind(this)
	this.addNote = this.addNote.bind(this)

  }
    
    changeValue(event){
	
	const changedValue = {
		name : event.target.value,
		puh : this.state.inputValue.puh,
		hakuEhto: this.state.hakuEhto
	}
	
	this.setState({
		inputValue: changedValue
	 })

  }
  
  componentDidMount() {
	
	personService
		.getPersons().then(response =>
		{
			console.log('reposnse', response)
			this.setState({persons: response})
		}
		)
	
  }
  
  changePuhValue(event){
	
	const changedValue = {
		puh : event.target.value,
		name : this.state.inputValue.name,
		hakuEhto: this.state.hakuEhto
	}
	
	this.setState({
		inputValue: changedValue
	 })

  }
  
  changeHakuValue(data){

	 this.setState({
		hakuEhto: data
	 })
	  
  }
  
  addNote(value) {
	
	console.log('value', value)
	const realValue = {
		name: value.name,
		puh: value.puh
	}
	this.state.persons.push(value)
	personService.addPerson(realValue)
	.then(response => {
		console.log(response)
	})	  
  }
  
    onSubmit(event){

	  event.preventDefault()
	  const value = this.state.inputValue
	  // so shorthanding the if statement
	  const {hakuEhto, inputValue, persons} = this.state
	  persons.map(function(e) { return e.name; }).indexOf(value.name) < 0 && this.addNote(value)
	  this.setState({
		  persons: this.state.persons,
		  inputValue: {name: '', puh: ''}
	  })
  }
  
  checkHakuEhto(person) {
	  console.log('H',person.name, this.state.hakuEhto)
	  let hakuEhto = this.state.hakuEhto;
	  if (typeof hakuEhto === 'undefined') {
		  return true
	  }
	  if (hakuEhto === '') {
		  return true
	  }
	  let result = (person.name.startsWith(this.state.hakuEhto));

	  return result
  }
  
  
  render() {

	console.log('state', this.state)
	const namesToShow =
    !this.state.hakuEhto ?
      this.state.persons :
      this.state.persons.filter(this.checkHakuEhto)
	
	console.log('namesToShow',namesToShow)
	  
    return (
        <div>
			<HakuLomake hakuEhto = {this.state.hakuEhto}  changeHakuValue = {this.changeHakuValue} />
			<h2>Puhelinluettelo</h2>
			<form onSubmit={this.onSubmit}>
			<div>
				nimi: <input value={this.state.inputValue.name} onChange={this.changeValue}/>
			</div>
			<div>
				puh#: <input value={this.state.inputValue.puh} onChange={this.changePuhValue}/>
			</div>
			<AddButton />
			</form>
			<Numerot persons = {namesToShow} />
		</div>
    )
  }
}

const AddButton = () => {
				return (<div>
					<button type="submit">lisää</button>
				</div>)
}


export default PuhelinLuettelo