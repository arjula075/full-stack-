import React from 'react'
import ReactDOM from 'react-dom'

function FeedBackButton(props) {
  return (
	<button onClick={props.onClick}>
	  {props.item.otsikko}
	</button>
  );
}



class Nappulat extends React.Component {
	constructor(props) {
		super(props)
		const {data, onClick} = this.props
		this.state = {
			counter: data.vaihtoehdot,
			onClick: onClick
		}
		this.state.onClick = this.state.onClick.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.renderButton = this.renderButton.bind(this)
	}
	
	handleClick(item) {
		this.state.onClick(item)
	}
	
	renderButton(item){
		return (
			<li key={item.otsikko}> <FeedBackButton item={item} 
					onClick={() => this.handleClick(item)}/></li>
		)
	}

	
	render() {
		let listItems = this.state.counter.map(function(item){
				return (
					this.renderButton(item)
					)
				}
			, this)
		return (
			<div><ul>{listItems}</ul></div>
		)
	}
	
}

class Otsikko extends React.Component {
	
	constructor(props) {
		super(props)
		const {data, otsikko} = this.props
		let header = (otsikko === 'paa') ? data.paaOtsikko : data.tilastoOtsikko;
		this.state = {
				counter: header
		}
	}

	render() {
		return (
			<div><h1>{this.state.counter}</h1></div>
		)
	}
	
}

class Tilastot extends React.Component {
	
	constructor(props) {
		super(props)
		console.log('props',props)
		const {data} = this.props
		this.state = {
			counter: data
		}
	}
	
	render() {
			let listItems = this.state.counter.map(function(item){
				return (
					<li key={item.otsikko}>{item.otsikko} : {item.counter}</li>
					)
				}
			, this)
		return (
			<div><ul>{listItems}</ul></div>
		)
	}
	
}

class App extends React.Component {
			
	constructor() {
		super()
		if (typeof this.state === 'undefined') {
			this.state = {
				counter: 1,
				paaOtsikko: 'Anna palautetta',
				tilastoOtsikko: 'tilastot',
				vaihtoehdot: [
				{
					otsikko: 'hyvä',
					counter: 0,
				},
								{
					otsikko: 'so so',
					counter: 0,
				},
								{
					otsikko: 'unacceptable',
					counter: 0,
				},
				]
			}
			
		}
		this.handleClick = this.handleClick.bind(this)
		this.getCurrentCounter = this.getCurrentCounter.bind(this)
	}
	
	getCurrentCounter(header, otsikko) {
		for (let i = 0; i < this.state.vaihtoehdot.length; i++) {
			if (this.state.vaihtoehdot[i].otsikko === header) {
				if (header === otsikko) {
					return this.state.vaihtoehdot[i].counter + 1;
				}
				else {
					return this.state.vaihtoehdot[i].counter;
				}
			}
		}
		return 0;
	}
	
	handleClick = (i) => {
		const options = [
				{
					otsikko: 'hyvä',
					counter: this.getCurrentCounter('hyvä', i.otsikko),
				},
								{
					otsikko: 'so so',
					counter: this.getCurrentCounter('so so', i.otsikko),
				},
								{
					otsikko: 'unacceptable',
					counter: this.getCurrentCounter('unacceptable', i.otsikko),
				},
				]
		this.setState({
			vaihtoehdot: options
		})
	}
	
	render() {
		console.log('in render',this.state)
		return (
			<div>
				<Otsikko data = {this.state} otsikko='paa'/>
				<Nappulat data = {this.state} onClick={(i) => this.handleClick(i)} />
				<Otsikko data = {this.state} otsikko = 'tilasto' />
				<Tilastot data = {this.state.vaihtoehdot} />
			</div>
		)
	}
	

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
