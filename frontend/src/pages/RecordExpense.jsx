import React, { useState, useEffect } from 'react'
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
	const [totalExpenses, setTotalExpenses] = useState(0)

	// Считаем общую сумму трат
	useEffect(() => {
		const fetchTotalExpenses = async () => {
			try {
				const response = await fetch(`/expensesum/?day_id=${Number(dayNumber)}`)
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
	}, [dayId]) // перезапускаем при изменении dayId

	// Функция для показа всех трат
	useEffect(() => {
		const fetchExpenses = async () => {
			try {
				const response = await fetch(`/expense/?day_id=${Number(dayNumber)}`)
				const data = await response.json()
				console.log('Полученные траты:', data) // Логируем, что вернул сервер
				if (response.ok) {
					setExpenses(data)
				} else {
					console.error('Ошибка при получении трат:', data.detail)
				}
			} catch (error) {
				console.error('Ошибка при отправке запроса:', error)
			}
		}

		fetchExpenses()
	}, [dayId]) // перезапускаем при изменении dayId

	// Функция для добавления траты
	const addExpense = async newExpense => {
		const payload = {
			expense: newExpense,
			day_id: Number(dayNumber), // убеждаемся, что число
		}

		console.log('Отправляемый объект:', payload) // Логируем

		try {
			const response = await fetch(`/expense/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})
			const data = await response.json()

			if (response.ok) {
				setExpenses(prevExpenses => [...prevExpenses, data])
				setTotalExpenses(prevTotal => prevTotal + data.expense) // Обновляем сумму сразу
			} else {
				console.error('Ошибка при добавлении траты:', data.detail)
			}
		} catch (error) {
			console.error('Ошибка при отправке запроса:', error)
		}
	}

	// Функция для удаления траты
	const delExpense = async expenseId => {
		try {
			const expenseToDelete = expenses.find(exp => exp.id === expenseId) // Ищем сумму перед удалением
			if (!expenseToDelete) return

			const response = await fetch(`/expense/${expenseId}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				console.error('Ошибка при удалении траты:', response.status)
				return
			}

			// Удаляем трату из состояния
			setExpenses(prevExpenses =>
				prevExpenses.filter(expense => expense.id !== expenseId)
			)
			setTotalExpenses(prevTotal => prevTotal - expenseToDelete.expense) // Мгновенно уменьшаем сумму
		} catch (error) {
			console.error('Ошибка при отправке запроса:', error)
		}
	}

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
								expenseText={expense.expense} // Тут было неправильно, исправил
								delExpense={() => delExpense(expense.id)} // Удалять надо по ID, а не по expense
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
