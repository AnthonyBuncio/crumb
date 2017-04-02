import React from 'react'

import ACTIONS from '../../actions.js'

var HouseForm = React.createClass({
	render: function() {
		return (
			<div>
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
				name : formEl.houseName.value
			}
		formEl.reset()
		console.log(formData)
		ACTIONS.addHouse(formData)
	},
	render: function() {
		return (
			<form onSubmit={this._handleSubmit}>
				<h3>Create a name for your home:</h3>
				<input type='text' name='houseName' placeholder='House name' />
			</form>
			)
	}
})

export default HouseForm