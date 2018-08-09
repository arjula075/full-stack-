import React from 'react';
import Blog from './components/Blog'


class App extends React.Component {
  constructor(props) {
    super(props)
	
    this.state = {
		blogTexts: props.persons,
	}
	console.log('this.state a', this.state)
  }
   
 render() {
    return (
	<Blog blogTexts = {this.state.blogTexts} />
    )
  }
}

export default App