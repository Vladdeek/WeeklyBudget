import React, { useState } from 'react'
import '../ExpenseCard/ExpenseCard.css'
import AddBtnIcon from '../../assets/image/addbtn.ico'

const ExpenseCard = ({ expenseText, delExpense }) => {
	return (
		<div className='col-lg-4 col-md-6 col-xs-12'>
			<div className='content'>
				<img
					className='del-btn'
					src={AddBtnIcon}
					alt='+'
					onClick={delExpense}
				/>
				<div className='text'>
					<p className='expense'>-{expenseText} ₽</p>
				</div>
			</div>
		</div>
	)
}

export default ExpenseCard
