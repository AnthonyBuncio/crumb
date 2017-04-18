import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'

import ACTIONS from '../../actions.js'
import STORE from '../../store.js'

var ExpenseForm = React.createClass({
	componentWillMount: function() {
		ACTIONS._getHouseMembers()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	getInitialState: function() {
		return STORE.data
	},
	_handleSubmit: function(eventObj) {
		eventObj.preventDefault()
		var formEl = eventObj.target,
			formData = {
				category: formEl.expenseCategory.value,
				debtor: formEl.expenseDebtor.value, 
				amount: formEl.expenseAmount.value,
				deadline: this.state.deadline
			}
		formEl.reset()
		ACTIONS.addExpense(formData)
	},
	_showOneMember: function(model) {
		return <option value={`${model.get('_id')}`}>{model.get('name')}</option>
	},
	_handleDate: function(date) {
		this.setState({
			deadline : date
		})
	},
	render: function() {
		return (
			<div className="expense-form-wrapper">
				<p>Due date:</p>
				<DatePicker name='date' className="expense-date expense-item" placeholderText="Select a date" selected={this.state.deadline} onChange={this._handleDate}/>
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
						{STORE.get('houseMembers').map(this._showOneMember)}
					</select>
					<input type='text' name='expenseAmount' className="expense-amount expense-item" placeholder='0.00'></input>
				</form>
			</div>
			)
	}
})

export default ExpenseForm