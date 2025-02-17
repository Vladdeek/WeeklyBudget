import React from 'react'
import ReactDOM from 'react-dom/client'
import DailyExpenses from './pages/DailyExpenses'
import RecordExpense from './pages/RecordExpense'
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<>
		<RecordExpense />
	</>
)
