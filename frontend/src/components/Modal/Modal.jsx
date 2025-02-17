import React, { useState } from 'react'
import '../Modal/Modal.css'

const Modal = ({ hideCreateModal, addTask }) => {
	const [taskText, setTaskText] = useState('')

	const handleSubmit = e => {
		e.preventDefault() // Чтобы форма не перезагружала страницу
		addTask(taskText) // Добавляем задачу в родительский компонент
		setTaskText('') // Очищаем поле ввода
		hideCreateModal() // Закрываем модальное окно
	}

	return (
		<div className='createTask-modal'>
			<div className='screen' onClick={hideCreateModal}></div>
			<div className='container'>
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<form className='create-task' onSubmit={handleSubmit}>
							<input
								className='input-task'
								type='text'
								placeholder='Задача'
								value={taskText}
								onChange={e => setTaskText(e.target.value)} // Обновляем текст задачи
							/>
							<input type='submit' className='save' value='Создать' />
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
