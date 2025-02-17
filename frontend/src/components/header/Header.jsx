import React from 'react'
import '../header/Header.css'

const Header = ({ WeaklyBudget }) => {
	return (
		<header className='d-flex align-items-center justify-content-center'>
			<p className=' text-center WeaklyBudget'>{WeaklyBudget}</p>
		</header>
	)
}

export default Header
