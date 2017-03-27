import React from 'react'

import ACTIONS from '../actions.js'

var SignupPage = React.createClass({
	render: function() {
		return (
			<div className="form-container">
				<SignupForm />
			</div>
			)
	}
})

var SignupForm = React.createClass({
	_handleSubmit: function(eventObj) {
		eventObj.preventDefault()
		var input = eventObj.target,
			userInput = {
				'name': input.name.value,
				'email': input.email.value,
				'password': input.password.value
			}
		console.log(userInput)
		ACTIONS.registerUser(userInput)
	},
	render: function() {
		return (
			<form onSubmit={this._handleSubmit} className="signup-form">
				<input className="create-form signup" name="name" type="text" placeholder="Your name"/>
				<input className="create-form signup" name="email" type="text" placeholder="Your email"/>
				<input className="create-form signup" name="password" type="password" placeholder="Create password"/>
				<button className="signup" type="submit">Create account</button>
			</form>
			)
	}
})

export default SignupPage