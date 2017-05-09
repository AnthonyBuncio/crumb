import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'

import ACTIONS from '../../actions.js'
import STORE from '../../store.js'

var ExpenseForm = React.createClass({
	//gets house members to add to form
	componentWillMount: function() {
		ACTIONS._getHouseMembers()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	getInitialState: function() {
		return STORE.data
	},
	//occurs when form is submitted and enter key is pressed
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
	//takes members from the STORE and adds to dropdown menu
	_showOneMember: function(model) {
		return <option value={`${model.get('_id')}`}>{model.get('name')}</option>
	},
	//changes the user submitted due date in the STORE
	_handleDate: function(date) {
		this.setState({
			deadline : date
		})
	},
	//displays form
	render: function() {
		return (
			<div className="expense-form-wrapper">
				<div className="date-wrapper">
					<label>Due by?</label>
					<DatePicker name='date' className="expense-date expense-item" placeholderText="Select a date" selected={this.state.deadline} onChange={this._handleDate}/>
				</div>
				<form onSubmit={this._handleSubmit} className="expense-form">
					<label>What?</label>
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
					<label>Who?</label>
					<select name='expenseDebtor' className="expense-debtor expense-item">
						<option selected="selected" disabled>Members</option>
						{STORE.get('houseMembers').map(this._showOneMember)}
					</select>
					<label>How much?</label>
					<span className="dollar-sign">$</span>
					<input type='text' name='expenseAmount' className="expense-amount expense-item" placeholder='0.00'></input>
				</form>
			</div>

			)
	}
})

export default ExpenseForm