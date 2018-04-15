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
		let headerSize = (otsikko === 'paa') ? 'h1' : 'h2';
		this.state = {
				counter: header,
				headerSize: headerSize
		}
	}

	render() {
		if (this.state.headerSize === 'h1') {
			return (
				<div><h1>{this.state.counter}</h1></div>
			)
		}
		else if (this.state.headerSize === 'h2') {
			return (
				<div><h2>{this.state.counter}</h2></div>
			)
			
		}
		else {
			return (
				<div><h3>{this.state.counter}</h3></div>
			)
		}
	}
	
}

const Tilastot = (props) => {
	
	const counter = props.data;
	const result = statisticsList(counter)
	return result
	
}

class App extends React.Component {
			
	constructor(props) {
		super(props)
		if (typeof props.counter === 'undefined') {
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
		else {
			console.log('setting state to props')
			this.state = props
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
		renderoiData(this.state)
	}
	
	render() {
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

const renderoiData = (data) => {
	ReactDOM.render(
    <App data = {data}/>,
    document.getElementById('root')
  )
}

function statisticsList (counter) {
	
	let totalCount = 0;
	let approvalRate = 0;
	let goodGrades = 0;
	let listItems = counter.map(function(item){
		totalCount = totalCount + item.counter;
		switch (item.otsikko) {
			case 'hyvä':
				approvalRate = approvalRate + item.counter;
				goodGrades = item.counter;
				break;
			case 'unacceptable' :
				approvalRate = approvalRate - item.counter;
				break;
			default : 
				// do nothing, but will not have warnings
				approvalRate = approvalRate;
		}
		return (
			<li key={item.otsikko}>{item.otsikko} : {item.counter}</li>
			)
		}
	)
	console.log(totalCount, approvalRate)
	
	if (totalCount === 0) {
		return (
			<div>ei arvosteluja vielä</div>
		)
	}
	else {
		return (
			<div>
				<div>
					<ul>{listItems}</ul>
				</div>
				<div>
					<ul> 
						<li>keskiarvo : {approvalRate / totalCount}</li>
						<li>hyviä arvosteluja : {goodGrades / totalCount * 100}%</li>
					</ul>
				</div>
			</div>
		)
	}
}