import React from 'react'

import ACTIONS from '../../actions.js'

var HouseForm = React.createClass({
	render: function() {
		return (
			<div className="house-form-wrapper">
				<CreateForm />
			</div>
			)
	}
})

var CreateForm = React.createClass({
	//takes user input and passes the data to ACTIONS
		//ACTIONS will create new house with the data as it's name
	_handleSubmit: function(eventObj) {
		eventObj.preventDefault()
		var formEl = eventObj.target,
			formData = {
				name : formEl.houseName.value
			}
		formEl.reset()
		ACTIONS.addHouse(formData)
	},
	//display form
	render: function() {
		return (
			<form onSubmit={this._handleSubmit} className="house-form">
				<h3>Create a name for your home:</h3>
				<input type='text' name='houseName' placeholder='House name' />
				<div>
					<button type='submit'>Create my house</button>
				</div>
			</form>
			)
	}
})

export default HouseForm