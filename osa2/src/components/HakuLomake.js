import React from 'react';

// ok, tämä on tehty tyhmästi.
// mutta miten saa ala-komponetille kerrottua, että sen tila
// vaihtui ylempänä?

// ja taas jos koko tiedon vie ylös, niin silloin tuo
// input value ei enää päivity...

class HakuLomake extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hakuEhto: props.hakuEhto,
	 changeHakuValue: props.changeHakuValue
    }
	console.log('this.state', this.state)
	
	this.changeHakuValue = this.changeHakuValue.bind(this)
  }
  
  changeHakuValue(event) {
	  console.log('this.state', this.state)
	  const data = event.target.value 
	  this.setState({
		 hakuEhto: data 
	  })
	  this.state.changeHakuValue(data)
  }


  render() {
    return (
      <div>
		hae: <input value={this.state.hakuEhto} onChange={this.changeHakuValue}/>
      </div>
    )
  }
}

export default HakuLomake