import React from 'react'
import '../DayCard/Day-Card.css'

const DayCard = ({ id, dailyCost }) => {
	return (
		<div className='col-12 card d-flex flex-row'>
			<div className='info-con'>
				<p className='dailyCost'>{dailyCost}</p>
			</div>
			<div className='number-con'>
				<p className='day-number'>{id}</p>
			</div>
		</div>
	)
}

export default DayCard
