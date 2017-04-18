import React from 'react'

import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
import HomeNav from './components/homeNav.js'

var HomePage = React.createClass({
	render: function() {
		return (
			<div className="page-wrapper home-wrapper">
				<HomeNav />
				<div className="main-container">
					
					{/* remove once HomeNav is fixed */}
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />

					<h1>Welcome to my amazing finance tracking app, <span>{User.getCurrentUser().get('name')}</span>. We are currently under construction. Please come back in 2-3 weeks. Thank you for your cooperation!</h1>
					<br />
					<h1>You are currently not linked to a House. <a href="#createhouse">Click here</a> to create a new home to start keeping track!</h1>
				</div>
			</div>
			)
	}
})

export default HomePage