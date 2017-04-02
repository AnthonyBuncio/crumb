import React from 'react'

import ACTIONS from '../actions.js'
import LandingNav from '../views/components/landingNav.js'

var LoginPage = React.createClass({
	render: function() {
		return (
			<div className="form-container login-container">
				<LandingNav />
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
			<div className="login-form">
				{/* <h2 className="title">Sign In</h2> */}
				<form onSubmit={this._handleSubmit}>
					<input className="create-form login" name="email" type="text" placeholder="Your email"/>
					<input className="create-form login" name="password" type="password" placeholder="Your password"/>
					<button className="login" type="submit">Log in</button>
				</form>
			</div>
			)
	}
})

export default LoginPage