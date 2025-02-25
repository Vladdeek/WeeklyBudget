import React from 'react'
import '../ResetButton/ResetButton.css'

const API_URL = 'http://192.168.1.101:8000'

const clearDatabase = async () => {
	try {
		const response = await fetch(`${API_URL}/clear_db/`, {
			method: 'DELETE',
		})
		const data = await response.json()
		console.log(data.message || data.error)
		window.location.reload()
	} catch (error) {
		console.error('Ошибка при очистке базы данных:', error)
	}
}

const ResetButton = () => {
	return (
		<div className='col-12 d-flex justify-content-center'>
			<button className='reset-btn' onClick={clearDatabase}>
				очистить
			</button>
		</div>
	)
}

export default ResetButton
