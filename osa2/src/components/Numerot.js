import React from 'react';

const Numerot = (props) => {

		return (
		<div>
		<h2>Numerot</h2>
		{
			props.persons.map(osa => {
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