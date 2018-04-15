import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
	this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick() {
	  this.setState({
		  selected : Math.floor(Math.random() * 6)
	  })
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
		<Nappula onClick={() => this.handleClick()} />
      </div>
    )
  }
}

class Nappula extends React.Component {
	constructor(props) {
		super(props)
		const {onClick} = this.props
		this.state = {
			onClick: onClick
		}
		this.state.onClick = this.state.onClick.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}
	
	handleClick() {
		this.state.onClick()
	}
	
	render() {
		return (
			<div><RandomButton 
					onClick={() => this.handleClick()}/></div>
		)
	}
	
}

function RandomButton(props) {
  return (
	<button onClick={props.onClick}>
	  Satunnainen heitto             
	</button>
  );
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)