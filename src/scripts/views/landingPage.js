import React from 'react'

import LandingNav from './components/landingNav.js'

var LandingPage = React.createClass({
	_getStarted: function() {
		location.hash = "signup"
	},
	render: function() {
		return (
			<div className="landing-page">
				<LandingNav />
				<div className="hero-text">
					<h2>The easiest way to<br/>manage shared<br/>expenses online</h2>
					<p>Create a shared home online to track all expenses<br/>within your household. No monthly charges or startup<br/>fees. Unlimited members per household.</p>
					<button className="hero-button" type='button' onClick={this._getStarted}>Get started now</button>
				</div>
			</div>
			)
	}
})

export default LandingPage