// 20 min 26.04
import React from 'react';
import Numerot from './Numerot'
import HakuLomake from './HakuLomake'
import personService from '../service/persons'


class PuhelinLuettelo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
		persons: props.persons,
		inputValue: props.inputValue,
		hakuEhto: '',
		successtext: null,
		errortext: null

    }
	this.onSubmit = this.onSubmit.bind(this)
	this.changeValue = this.changeValue.bind(this)
	this.changePuhValue = this.changePuhValue.bind(this)
	this.changeHakuValue = this.changeHakuValue.bind(this)
	this.checkHakuEhto = this.checkHakuEhto.bind(this)
	this.addNote = this.addNote.bind(this)
	this.removeValue = this.removeValue.bind(this)
	this.removeNote = this.removeNote.bind(this)
	this.updateNote = this.updateNote.bind(this)
	this.clearmessages = this.clearmessages.bind(this)
  }

  clearmessages() {
	  this.setState({
			successtext: null,
			errortext: null
	  })
  }

  updateNote(value) {

	 console.log('update value', value)
	 if (window.confirm("henkilö " + value.name + "on jo olemassa. Päivitetäänkö puh#?")) {

			let persons = this.state.persons
			let person = persons.splice(persons.indexOf(value.name), 1)
			console.log('person', person)
			person[0].puh = value.puh
			personService.updatePerson(person[0])
			.then(response => {
				console.log(response)
				this.setState({
					successtext: 'päivitys onnistui'
				})
				setTimeout(() => {
					this.clearmessages()
				}, 3000)
			})
			.catch(error => {
				console.log('error', error)
				this.setState({
					errortext: 'jotain päivityksessä meni pieleen'
				})
				console.log('error', error)
				setTimeout(() => {
					this.clearmessages()
				}, 3000)
				return
		})

			persons.push(value)
			this.setState({
				  persons: persons,
				  inputValue: {name: '', puh: ''}
			})
	}

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

  removeValue(value) {
	  console.log(' remove value', value.target.value)
	 if (window.confirm("poistetaanko " + value.target.value + "?")) {

			  const {hakuEhto, inputValue, persons} = this.state
        console.log(hakuEhto, inputValue, persons);
			  persons.map(function(e) { return e.name; }).indexOf(value.name) < 0 && this.removeNote(value.target.value)
			  this.setState({
				  persons: this.state.persons,
				  inputValue: {name: '', puh: ''}
			  })
	}


  }

  removeNote(value) {
	  const persons = this.state.persons
	  const searchArray = persons.map(function(e) { return e.name; })
	  const person = persons.splice(searchArray.indexOf(value), 1)
	  console.log('person', person)
	  personService.deletePerson(person[0].id)
	  .then(response => {
				console.log(response)
				this.setState({
					successtext: 'poisto onnistui'
				})
				setTimeout(() => {
					this.clearmessages()
				}, 3000)
			})
		.catch(error => {
				console.log(error)
				this.setState({
					errortext: 'jotain poistossa meni pieleen'
				})
				setTimeout(() => {
					this.clearmessages()
				}, 3000)
				return
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

	personService.addPerson(realValue)
	.then(response => {
				console.log('lisäyksen paluuarvo', response)
        this.state.persons.push(response)
				this.setState({
					successtext: 'lisäys onnistui'
				})

				setTimeout(() => {
					this.clearmessages()
				}, 3000)
	})
	.catch(error => {
				console.log(error)
				this.setState({
					errortext: 'jotain lisäyksessä meni pieleen'
				})
				setTimeout(() => {
					this.clearmessages()
				}, 3000)
				return
		})
  }

    onSubmit(event){

	  event.preventDefault()
	  const value = this.state.inputValue
	  // so shorthanding the if statement

	  // and 2.17 ruined it. Now I have to refactor it
	  const {hakuEhto, inputValue, persons} = this.state
    console.log(hakuEhto, inputValue, persons);
	  const searchArray = persons.map(function(e) { return e.name; })
	  if (searchArray.indexOf(value.name) < 0) {
		this.addNote(value)
	  }
	  else {
		this.updateNote(value)
		}
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
			<Notification message={this.state.successtext} error={this.state.errortext} />
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
			<Numerot persons = {namesToShow} onClick={this.removeValue}/>
		</div>
    )
  }
}

const AddButton = () => {
				return (<div>
					<button type="submit">lisää</button>
				</div>)
}

const Notification = ({ message, error }) => {
	console.log(message, error)
  if (message === null && error === null) {
    return null
  }
  else if (message === null) {
	  return (
		<div className="error">
		  {error}
		</div>
	  )
  }
  else {
	return (
		<div className="note">
		  {message}
		</div>
	  )
  }
}


export default PuhelinLuettelo
