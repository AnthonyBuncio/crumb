import React from 'react'

import ACTIONS from '../../actions.js'
import STORE from '../../store.js'

var ExpenseForm = React.createClass({
	componentWillMount: function() {
		ACTIONS._getHouseMembers()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	render: function() {
		return (
			<div className="expense-form-wrapper">
				<CreateForm houseMembers={STORE.get('houseMembers')}/>
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
				debtor: formEl.expenseDebtor.value, 
				amount: formEl.expenseAmount.value
			}
		formEl.reset()
		ACTIONS.addExpense(formData)
	},
	_showOneMember: function(model) {
		return <option value={`${model.get('_id')}`}>{model.get('name')}</option>
	},
	render: function() {
		return (
			<form onSubmit={this._handleSubmit} className="expense-form">
				<select name='expenseCategory' className="expense-category expense-item">
					<option selected="selected" disabled>Category</option>
					<option value="Rent">Rent</option>
					<option value="Electricity">Electricity</option>
					<option value="Gas">Gas</option>
					<option value="Utilities">Utilities</option>
					<option value="Supplies">Supplies</option>
					<option value="Groceries">Groceries</option>
					<option value="Other">Other</option>
				</select>
				<select name='expenseDebtor' className="expense-debtor expense-item">
					<option selected="selected" disabled>Members</option>
					{this.props.houseMembers.map(this._showOneMember)}
				</select>
				<input type='text' name='expenseAmount' className="expense-amount expense-item" placeholder='0.00'></input>
			</form>
			)
	}
})

export default ExpenseForm