import React from 'react';
import PuhelinLuettelo from './components/Puhelinluettelo'

class App extends React.Component {
  constructor(props) {
    super(props)
	console.log(props)
    this.state = {
		persons: props.persons,
		inputValue: ''
	}
  }
  
 
  render() {
    return (
	<PuhelinLuettelo persons = {this.state.persons} inputValue = {this.state.inputValue}/>
    )
  }
}

export default App