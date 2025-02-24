import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../DayCard/Day-Card.css'

const DayCard = ({ id, dailyCost }) => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate(`/record/day${id}`) // Переход на страницу записи трат с параметром дня
	}

	return (
		<div
			className='col-12 card d-flex flex-row'
			onClick={handleClick}
			style={{ cursor: 'pointer' }}
		>
			<div className='info-con'>
				<p className='dailyCost'>-{dailyCost} ₽</p>
			</div>
			<div className='number-con'>
				<p className='day-number'>{id}</p>
			</div>
		</div>
	)
}

export default DayCard
