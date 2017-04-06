import React from 'react'

import HomeNav from './components/homeNav.js'
import ExpenseForm from './components/createExpenseForm.js'

var AddExpensePage = React.createClass({
	render: function() {
		return (
			<div>
				<HomeNav />
					<div className="main-container">
						
						{/* remove once HomeNav is fixed */}
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />

						<ExpenseForm />
					</div>
			</div>
			)
	}
})

export default AddExpensePage