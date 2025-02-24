import React from 'react'
import '../ResetButton/ResetButton.css'

const clearDatabase = async () => {
	try {
		const response = await fetch('http://localhost:8000/clear_db/', {
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
		<div class='col-12 d-flex justify-content-center'>
			<button onClick={clearDatabase}>очистить</button>
		</div>
	)
}

export default ResetButton
