import React, { useState, useEffect } from 'react'
import DayCard from '../components/DayCard/Day-Card'
import Header from '../components/header/Header'
import ResetButton from '../components/ResetButton/ResetButton'

const DailyExpenses = () => {
	const [expenses, setExpenses] = useState([
		{ id: 1, dailyCost: 0 },
		{ id: 2, dailyCost: 0 },
		{ id: 3, dailyCost: 0 },
		{ id: 4, dailyCost: 0 },
		{ id: 5, dailyCost: 0 },
		{ id: 6, dailyCost: 0 },
		{ id: 7, dailyCost: 0 },
	])

	const [totalExpenses, setTotalExpenses] = useState(0)

	// Загружаем сумму трат для каждого дня
	useEffect(() => {
		const fetchDailyExpenses = async () => {
			const updatedExpenses = await Promise.all(
				expenses.map(async expense => {
					try {
						const response = await fetch(`/expensesum/?day_id=${expense.id}`)
						const data = await response.json()
						if (response.ok) {
							return { ...expense, dailyCost: data }
						} else {
							console.error(
								`Ошибка загрузки данных для дня ${expense.id}:`,
								data.detail
							)
							return expense
						}
					} catch (error) {
						console.error(`Ошибка запроса для дня ${expense.id}:`, error)
						return expense
					}
				})
			)

			setExpenses(updatedExpenses)
		}

		fetchDailyExpenses()
	}, []) // Выполняем один раз при загрузке страницы

	// Загружаем общую сумму всех трат
	useEffect(() => {
		const fetchTotalExpenses = async () => {
			try {
				const response = await fetch(`/allexpensesum/`)
				const data = await response.json()
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
	}, []) // Выполняем один раз при загрузке страницы

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
