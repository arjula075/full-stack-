import React from 'react';

const Numerot = (props) => {
		// WHY, GOD WHY?
		// ok, as this is an exercise, hack is always an option
		
		// I guess the reason is that on second time around, the data is set a
		// bit differently (love that feature of javascript)
		
		if (typeof props.persons !== 'undefined') {
		console.log('p', props)
		let {newName, persons} = props.persons
		const onClick = props.onClick
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
					<p >{osa.name}, {osa.puh} <button type="button" value={osa.name} onClick={onClick}>poista</button></p>
				 </div>
				)
			}
		)
		}
		</div>
		)
	}
	else {
		return (
		<div>
		<h2>Numerot</h2>
		</div>
		)
	}
}

export default Numerot