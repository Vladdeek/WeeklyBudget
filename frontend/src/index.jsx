import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DailyExpenses from './pages/DailyExpenses'
import RecordExpense from './pages/RecordExpense'
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<DailyExpenses />} />
			<Route path='/record/:dayId' element={<RecordExpense />} />
		</Routes>
	</BrowserRouter>
)
