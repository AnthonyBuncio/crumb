import React from 'react'

import ACTIONS from '../../actions.js'

var MemberForm = React.createClass({
	render: function() {
		return (
			<div className="member-form-wrapper">
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
				members : formEl.member.value
			}
		formEl.reset()
		console.log(formData)

	},
	render: function() {
		return (
			<form onSubmit={this._handleSubmit}>
				<h3>Add a new member to your team:</h3>
				<input type='text' name='member' placeholder='Member name' />
			</form>
			)
	}
})

export default MemberForm