import React from 'react';

const Numerot = (props) => {
		// WHY, GOD WHY?
		// ok, as this is an exercise, hack is always an option
		
		// I guess the reason is that on second time around, the data is set a
		// bit differently (love that feature of javascript)
		
		console.log('p', props)
		console.log('p1', props.persons)
		console.log('p2', props.persons.persons)
		let {newName, persons} = props.persons
		console.log('persons', persons)
		if (typeof persons === 'undefined') {
			persons = props.persons
		}
		console.log('newName', newName)
		return (
		<div>
		<h2>Numerot</h2>
		{
			persons.map(osa => {
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

export default Numerot