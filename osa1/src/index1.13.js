import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
	  anecdotes: anecdotes
    }
	this.handleClick = this.handleClick.bind(this)
	this.handleVoteClick = this.handleVoteClick.bind(this)
  }
  
  handleClick() {
	  this.setState({
		  selected : Math.floor(Math.random() * 6)
	  })
  }
  
    handleVoteClick() {
		
		let pivotAnecdotes = this.state.anecdotes
		pivotAnecdotes[this.state.selected].counter = pivotAnecdotes[this.state.selected].counter + 1;
		
		this.setState({
			anecdotes :pivotAnecdotes
		})
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected].name} : {this.props.anecdotes[this.state.selected].counter}
		<Nappula onClick={() => this.handleClick()} />
		<VoteNappula onClick={() => this.handleVoteClick()} />
      </div>
    )
  }
}

class Nappula extends React.Component {
	constructor(props) {
		super(props)
		const {onClick} = this.props
		this.state = {
			onClick: onClick,
		}
		this.state.onClick = this.state.onClick.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}
	
	handleClick() {
		this.state.onClick()
	}
	
	render() {
		return (
			<div>
				<RandomButton onClick={() => this.handleClick()}/>
			</div>
		)
	}
	
}

class VoteNappula extends React.Component {
	constructor(props) {
		super(props)
		console.log(props)
		const {onClick} = this.props
		this.state = {
			onClick: onClick,
		}
		this.state.onClick = this.state.onClick.bind(this)
	}
	
	handleClick() {
		this.state.onClick()
	}
	
	render() {
		return (
			<div>
				<VoteButton onClick={() => this.handleClick()}/>
			</div>
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

function VoteButton(props) {
  return (
	<button onClick={props.onClick}>
	  Tää on hyvä             
	</button>
  );
}



const anecdotes = [
	{
		name: 'If it hurts, do it more often',
		counter: 0
	},
		{
		name: 'Adding manpower to a late software project makes it later!',
		counter: 0
	},
		{
		name: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		counter: 0
	},
		{
		name: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		counter: 0
	},
		{
		name: 'Premature optimization is the root of all evil.',
		counter: 0
	},
		{
		name: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		counter: 0
	}
  
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)