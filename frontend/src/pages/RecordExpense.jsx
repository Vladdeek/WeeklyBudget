import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ExpenseCard from '../components/ExpenseCard/ExpenseCard'
import AddExpenseBtn from '../components/AddExpenseBtn/AddExpenseBtn'
import Modal from '../components/Modal/Modal'
import Header from '../components/header/Header'

const RecordExpense = () => {
	const [showModal, setShowModal] = useState(false)
	const { dayId } = useParams() // Получаем параметр дня из URL

	// Извлекаем номер дня, убираем "day" и оставляем только цифры
	const dayNumber = dayId.replace('day', '')

	// Функция для показа и скрытия модального окна
	const showCreateModal = () => setShowModal(true)
	const hideCreateModal = () => setShowModal(false)

	const [expenses, setExpenses] = useState([])

	// Функция для добавления траты
	const addExpense = newExpense => {
		setExpenses([
			...expenses,
			{ expenseText: newExpense, amount: Number(newExpense) },
		])
	}

	// Функция для удаления траты
	const delExpense = expenseText => {
		setExpenses(expenses.filter(expense => expense.expenseText !== expenseText))
	}

	// Считаем общую сумму трат
	const totalExpenses = expenses.reduce(
		(total, expense) => total + expense.amount,
		0
	)

	return (
		<>
			{/* Передаем в Header DayIndex с номером дня */}
			<Header
				DayIndex={`День ${dayNumber}`}
				WeaklyBudget={`-${totalExpenses} ₽`}
			/>
			<section>
				<div className='container todo-con'>
					<div className='row todo-row'>
						{expenses.map((expense, index) => (
							<ExpenseCard
								key={index}
								expenseText={expense.expenseText}
								delExpense={() => delExpense(expense.expenseText)} // передаем функцию удаления для траты
							/>
						))}
						<AddExpenseBtn showCreateModal={showCreateModal} />
					</div>

					{showModal && (
						<Modal hideCreateModal={hideCreateModal} addExpense={addExpense} />
					)}
				</div>
			</section>
		</>
	)
}

export default RecordExpense
