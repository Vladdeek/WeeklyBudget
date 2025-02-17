import React, { useState } from 'react'

const ExpenseCard = ({ taskText, delTask }) => {
	return (
		<div className='col-lg-4 col-md-6 col-xs-12'>
			<div className='content'>
				<button className='del-btn text-center' onClick={delTask}>
					+
				</button>
				<div className='text'>
					<p className='task'>{taskText}</p>
				</div>
			</div>
		</div>
	)
}

export default ExpenseCard
