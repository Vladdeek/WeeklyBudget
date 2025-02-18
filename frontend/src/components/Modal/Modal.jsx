import React, { useState } from 'react'
import '../Modal/Modal.css'

const Modal = ({ hideCreateModal, addExpense }) => {
	const [expenseText, setExpenseText] = useState('')

	const handleSubmit = e => {
		e.preventDefault() // Чтобы форма не перезагружала страницу
		if (expenseText.trim()) {
			addExpense(expenseText) // Добавляем трату в родительский компонент
			setExpenseText('') // Очищаем поле ввода
			hideCreateModal() // Закрываем модальное окно
		} else {
			alert('Поле не может быть пустым!')
		}
	}

	return (
		<div className='createExpense-modal'>
			<div className='screen' onClick={hideCreateModal}></div>
			<div className='container'>
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<form className='create-expense' onSubmit={handleSubmit}>
							<input
								className='input-expense'
								type='number'
								placeholder='Трата'
								value={expenseText}
								onChange={e => setExpenseText(e.target.value)} // Обновляем текст трат
							/>
							<input type='submit' className='save' value='Записать' />
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
