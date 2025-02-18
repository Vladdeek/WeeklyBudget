import React, { useState } from 'react'
import DayCard from '../components/DayCard/Day-Card'
import Header from '../components/header/Header'
import ResetButton from '../components/ResetButton/ResetButton'

const DailyExpenses = () => {
	const WeaklyBudget = 3000
	const [expenses] = useState([
		{ id: 1, dailyCost: 0 },
		{ id: 2, dailyCost: 0 },
		{ id: 3, dailyCost: 0 },
		{ id: 4, dailyCost: 0 },
		{ id: 5, dailyCost: 0 },
		{ id: 6, dailyCost: 0 },
		{ id: 7, dailyCost: 0 },
	])

	// Считаем общую сумму расходов
	const totalExpenses = expenses.reduce(
		(total, expense) => total + expense.dailyCost,
		0
	)

	// Вычитаем сумму расходов из бюджета
	const remainingBudget = WeaklyBudget - totalExpenses

	// Состояние для отображения общего бюджета или суммы расходов
	const [showTotalExpenses, setShowTotalExpenses] = useState(false)

	// Функция для смены состояния при клике на хедер
	const handleHeaderClick = () => {
		setShowTotalExpenses(!showTotalExpenses)
	}

	return (
		<>
			{/* При клике на Header меняем отображение */}
			<Header
				DayIndex={''}
				WeaklyBudget={
					showTotalExpenses ? `-${totalExpenses} ₽` : `${remainingBudget} ₽`
				}
				handleClick={handleHeaderClick}
			/>
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
