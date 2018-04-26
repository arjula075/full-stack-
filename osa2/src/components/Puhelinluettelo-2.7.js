// 20 min 26.04
import React from 'react';

class PuhelinLuettelo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
		persons: props.persons,
		inputValue: props.inputValue
    }
	this.onSubmit = this.onSubmit.bind(this)
	this.changeValue = this.changeValue.bind(this)
  }
  
  changeValue(event){
	this.setState({
		inputValue: event.target.value
	 })

  }
  
    onSubmit(event){
		console.log(this.state)
	  event.preventDefault()
	  const value = { name: this.state.inputValue }
	  // so shorthanding the if statement
	  this.state.persons.persons.map(function(e) { return e.name; }).indexOf(value.name) < 0 && this.state.persons.persons.push(value)
	  this.setState({
		  persons: this.state.persons,
		  inputValue: ''
	  })
  }
  
  
  render() {
    return (
        <div>
			<h2>Puhelinluettelo</h2>
			<form onSubmit={this.onSubmit}>
			<div>
				nimi: <input value={this.state.inputValue} onChange={this.changeValue}/>
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
					<p >{osa.name}</p>
				 </div>
				)
			}
		)
		}
		</div>
	)
	
}

export default PuhelinLuettelo