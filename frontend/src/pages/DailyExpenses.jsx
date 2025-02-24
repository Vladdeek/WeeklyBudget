import React, { useState } from 'react'
import DayCard from '../components/DayCard/Day-Card'
import Header from '../components/header/Header'
import ResetButton from '../components/ResetButton/ResetButton'

const DailyExpenses = () => {
	const [expenses] = useState([
		{ id: 1, dailyCost: 0 },
		{ id: 2, dailyCost: 0 },
		{ id: 3, dailyCost: 0 },
		{ id: 4, dailyCost: 0 },
		{ id: 5, dailyCost: 0 },
		{ id: 6, dailyCost: 0 },
		{ id: 7, dailyCost: 0 },
	])

	const [totalExpenses, setTotalExpenses] = useState(0)

	// Считаем общую сумму трат
	const fetchTotalExpenses = async () => {
		try {
			const response = await fetch(`http://localhost:8000/allexpensesum/`)
			const data = await response.json()
			console.log(data)
			if (response.ok) {
				setTotalExpenses(data)
			} else {
				console.error('Ошибка при получении суммы расходов:', data.detail)
			}
		} catch (error) {
			console.error('Ошибка при отправке запроса:', error)
		}
	}
	fetchTotalExpenses()

	return (
		<>
			<Header DayIndex={''} WeaklyBudget={`-${totalExpenses}₽`} />
			<section>
				<div className='container todo-con'>
					<div className='row todo-row'>
						{expenses.map(expense => (
							<DayCard
								key={expense.id}
								id={expense.id}
								dailyCost={expense.dailyCost}
							/>
						))}
					</div>
				</div>
			</section>
			<ResetButton />
		</>
	)
}

export default DailyExpenses
