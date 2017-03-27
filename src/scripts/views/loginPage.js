import React from 'react'

import ACTIONS from '../actions.js'

var LoginPage = React.createClass({
	render: function() {
		return (
			<div className="form-container">
				<LoginForm />
			</div>
			)
	}
})

var LoginForm = React.createClass({
	_handleSubmit: function(eventObj) {
		eventObj.preventDefault()
		var input = eventObj.target
		ACTIONS.loginUser(input.email.value, input.password.value)
	},
	render: function() {
		return (
			<form onSubmit={this._handleSubmit} className="login-form">
				<input className="create-form login" name="email" type="text" placeholder="Your email"/>
				<input className="create-form login" name="password" type="password" placeholder="Your password"/>
				<button className="login" type="submit">Log in</button>
			</form>
			)
	}
})

export default LoginPage