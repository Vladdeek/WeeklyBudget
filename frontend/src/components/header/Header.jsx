import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../header/Header.css'
import BackBtnIco from '../../assets/image/left.png'

const Header = ({ WeaklyBudget, DayIndex, handleClick }) => {
	const location = useLocation()
	const navigate = useNavigate()
	return (
		<header
			className='d-flex align-items-center justify-content-between'
			onClick={handleClick}
		>
			<div className='d-flex BetweenCon justify-content-start'>
				{location.pathname.startsWith('/record') && ( // Показываем кнопку назад только если в пути есть "/record"
					<img
						className='BackBtn'
						src={BackBtnIco}
						alt='Back'
						onClick={() => navigate('/')} // Возвращаем на главную
					/>
				)}
			</div>
			<div className='d-flex BetweenCon justify-content-center'>
				<p className='text-center WeaklyBudget'>{WeaklyBudget}</p>
			</div>
			<div className='d-flex BetweenCon justify-content-end'>
				<p className='text-center DayIndex'>{DayIndex}</p>{' '}
				{/* Показываем номер дня */}
			</div>
		</header>
	)
}

export default Header
