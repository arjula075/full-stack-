// 20 min 26.04
import React from 'react';
import Numerot from './Numerot'

class PuhelinLuettelo extends React.Component {
  constructor(props) {
    super(props)
	console.log('p',props)
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
  
  changeHakuValue(event){
	  	this.setState({
		hakuEhto: event.target.value
	 })
	 console.log('c',this.state)
	  
  }
  
    onSubmit(event){
		console.log('', this.state)
	  event.preventDefault()
	  const value = this.state.inputValue
	  // so shorthanding the if statement
	  this.state.persons.persons.map(function(e) { return e.name; }).indexOf(value.name) < 0 && this.state.persons.persons.push(value)
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
	  console.log(person.name, this.hakuEhto, result)
	  return result
  }
  
  
  render() {
	 console.log('rc',this.state)
	const namesToShow =
    !this.state.hakuEhto ?
      this.state.persons.persons :
      this.state.persons.persons.filter(this.checkHakuEhto)
	
	console.log('render', namesToShow) 	
	  
    return (
        <div>
			<div>
				hae: <input value={this.state.hakuEhto} onChange={this.changeHakuValue}/>
			</div>

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