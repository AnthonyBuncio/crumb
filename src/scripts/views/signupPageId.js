import React from 'react'

import ACTIONS from '../actions.js'
import LandingNav from '../views/components/landingNav.js'

var SignupPageId = React.createClass({
	render: function() {
		console.log('make sure the props got passed', this.props.houseId)
		return (
			<div className="form-container signup-container">
				<LandingNav />
				<SignupForm house={this.props.houseId}/>
			</div>
			)
	}
})

var SignupForm = React.createClass({
	_handleSubmit: function(eventObj) {
		eventObj.preventDefault()
		var input = eventObj.target,
			newName = input.name.value,
			nameToUpperCase = newName.charAt(0).toUpperCase() + newName.slice(1),
			userInput = {
				'name': nameToUpperCase,
				'email': input.email.value,
				'password': input.password.value,
				'house': this.props.house
			}
		ACTIONS.registerUser(userInput)
	},
	render: function() {
		return (
			<div className="signup-form">
				{/* <h2 className="title">Create Account</h2> */}
				<form onSubmit={this._handleSubmit}>
					<input className="create-form signup" name="name" type="text" placeholder="Your name"/>
					<input className="create-form signup" name="email" type="text" placeholder="Your email"/>
					<input className="create-form signup" name="password" type="password" placeholder="Create password"/>
					<button className="signup" type="submit">Create account</button>
				</form>
			</div>
			)
	}
})

export default SignupPageId