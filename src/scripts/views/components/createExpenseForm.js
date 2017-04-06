import React from 'react'

import ACTIONS from '../../actions.js'

var ExpenseForm = React.createClass({
	render: function() {
		return (
			<div className="expense-form-wrapper">
				<CreateForm />
			</div>
			)
	}
})

var CreateForm = React.createClass({
	_handleSubmit: function(eventObj) {
		eventObj.preventDefault()
		var formEl = eventObj.target,
			formData = {
				category: formEl.expenseCategory.value,
				/* debtor: formEl.expenseDebtor.value, */
				amount: formEl.expenseAmount.value
			}
		formEl.reset()
		ACTIONS.addExpense(formData)
	},
	render: function() {
		return (
			<form onSubmit={this._handleSubmit} className="expense-form">
				<select name='expenseCategory'>
					<option selected="selected" disabled>Category</option>
					<option value="Rent">Rent</option>
					<option value="Electricity">Electricity</option>
					<option value="Gas">Gas</option>
					<option value="Utilities">Utilities</option>
					<option value="Supplies">Supplies</option>
					<option value="Groceries">Groceries</option>
					<option value="Other">Other</option>
				</select>
				<select name='expenseDebtor'>
					<option>ME</option>
					<option>YOU</option>
					<option>US</option>
				</select>
				<input type='text' name='expenseAmount' placeholder='0.00'></input>
			</form>
			)
	}
})

export default ExpenseForm