import React from 'react'

import HomeNav from './components/homeNav.js'
import ExpenseForm from './components/createExpenseForm.js'
import STORE from '../store.js'
import ACTIONS from '../actions.js'

var AddExpensePage = React.createClass({
	componentWillMount: function() {
		ACTIONS._getHouseExpenses()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	componentWillUnmount: function() {
		STORE.off('dataUpdated')
	},
	getInitialState: function() {
		return STORE.data
	},
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
						<ShowExpenses myExpenses={STORE.get('houseExpenses')}/>
					</div>
			</div>
			)
	}
})

var ShowExpenses = React.createClass({
	render: function() {
		console.log('expense component props', this.props)
		return (
			<div>
				<p>Shows list of current Expenses</p>
			</div>
			)
	}
})

export default AddExpensePage