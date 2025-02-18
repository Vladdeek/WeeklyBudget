import React from 'react'
import '../AddExpenseBtn/AddExpenseBtn.css'
import AddBtnIcon from '../../assets/image/addbtn.ico'

const AddExpenseBtn = ({ showCreateModal }) => {
	return (
		<div className='addTaskButton col-lg-4 col-md-6 col-xs-12'>
			<div
				className='new d-flex justify-content-center align-items-center'
				onClick={showCreateModal}
			>
				<img className='add-icon' src={AddBtnIcon} alt='Add task' />
			</div>
		</div>
	)
}

export default AddExpenseBtn
