// 20 min 26.04
import React from 'react';

class PuhelinLuettelo extends React.Component {
  constructor(props) {
    super(props)
	console.log('p',props)
    this.state = {
		persons: props.persons,
		inputValue: props.inputValue
    }
	this.onSubmit = this.onSubmit.bind(this)
	this.changeValue = this.changeValue.bind(this)
	this.changePuhValue = this.changePuhValue.bind(this)
  }
    
    changeValue(event){
	
	const changedValue = {
		name : event.target.value,
		puh : this.state.inputValue.puh
	}
	
	this.setState({
		inputValue: changedValue
	 })

  }
  
  changePuhValue(event){
	
	const changedValue = {
		puh : event.target.value,
		name : this.state.inputValue.name
	}
	
	this.setState({
		inputValue: changedValue
	 })

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
  
  
  render() {
    return (
        <div>
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
			<Numerot persons = {this.state.persons} />
		</div>
    )
  }
}

const AddButton = () => {
				return (<div>
					<button type="submit">lisää</button>
				</div>)
}

const Numerot = (props) => {
		console.log('n', props)
		return (
		<div>
		<h2>Numerot</h2>
		{
			props.persons.persons.map(osa => {
			return (
				 <div key={osa.name}>
					<p >{osa.name}, {osa.puh}</p>
				 </div>
				)
			}
		)
		}
		</div>
	)
	
}

export default PuhelinLuettelo