import React from 'react'

import User from '../../models/userModel.js'
import ACTIONS from '../../actions.js'

var HomeNav = React.createClass({
	render: function() {
		return (
			<div className="nav-wrapper">
				<a className="settings-nav home-button" href="#settings">{User.getCurrentUser().get('name')}</a>
				<a className="home-nav home-button" href="#home">Home</a>
				<a className="logout-nav home-button" onClick={ACTIONS.logoutUser} href="#landing">Logout</a>
			</div>
			)
	}
})

export default HomeNav