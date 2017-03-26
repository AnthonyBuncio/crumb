import React from 'react'

var LandingNav = React.createClass({
	_handleSignUp: function() {
		location.hash = "signup"
	},
	_handleLogIn: function() {
		location.hash = "login"
	},
	render: function() {
		return (
			<div className="landing-nav">
				<a className="logo landing-button" href="#home">Crumb.</a>
				<button className="sign-up landing-button" type='button' onClick={this._handleSignUp}>Sign up for free today!</button>
				<button className="log-in landing-button" type='button' onClick={this._handleLogIn}>Log in</button>
			</div>
			)
	}
})

export default LandingNav