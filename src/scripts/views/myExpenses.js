import React from 'react'

import HomeNav from './components/homeNav.js'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'

var MyExpenses = React.createClass({
	componentWillMount: function() {
		ACTIONS._getMyExpenses()
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
	checkForHouse: function() {
		if (User.getCurrentUser().get('house')) {
			return <ExpenseTable myExpenses={STORE.get('houseExpenses')}/>
		}
		location.hash = 'home'
	},
	render: function() {
		return (
			<div className="page-wrapper myexpense-wrapper">
				<HomeNav />
					<div className="main-container">
						{this.checkForHouse()}
					</div>
			</div>
			)
	}
})

var ExpenseTable = React.createClass({
	_listExpenses: function(model) {
		return <TableItems listItem={model} />
	},
	render: function() {
		console.log('table props', this.props.myExpenses)
		return (
			<div className="expense-list">
				<p>Expense History</p>
				<table className="expense-table">
					<thead>
						<tr>
							<th>Posted</th>
							<th>Category</th>
							<th>Amount</th>
							<th>Status</th>
						</tr>
					</thead>
					{this.props.myExpenses.map(this._listExpenses)}
				</table>
			</div>
			)
	}
})

var TableItems = React.createClass({
	_isPaid: function() {
		var isPaid = this.props.listItem.get('isPaid')
		if (isPaid === true) {
			return 'Paid '
		}
		return 'Unpaid '
	},
	_remove: function() {
		var currentModel = this.props.listItem
		ACTIONS.deleteExpense(currentModel)
	},
	_getDate: function(date) {
		var month = [date.slice(5,6), date.slice(6,7)],
			day = [date.slice(8,9), date.slice(9,10)],
			cal = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
			finalMonth = '',
			finalDay = ''
		if (month[1] < 10) {
			var currentMonth = (month[1]) - 1
			finalMonth = cal[currentMonth]
		}
		else if (month[0] === 1) {
			var currentMonth = (month[1]) - 1
			finalMonth = cal[currentMonth]
		}
		else if (month[0] === 0 && month[1] === 0) {
			finalMonth = cal[1]
		}

		if (day[0] > 0) {
			finalDay = day.join('')
		} 
		else {
			finalDay = day[1]
		}
		return finalMonth+ ' ' +finalDay
	},
	render: function() {
		var expense = this.props.listItem,
			paidExpense = (this.props.listItem.get('isPaid')) ? "table-paid" : "table-unpaid"
		return (
			<tbody>
				<tr>
					<td>{this._getDate(expense.get('createdAt'))}</td>
					<td>{expense.get('category')}</td>
					<td>$ {expense.get('amount')}</td>
					<td>{this._isPaid()} </td>
				</tr>
			</tbody>
			)
	}
})

export default MyExpenses