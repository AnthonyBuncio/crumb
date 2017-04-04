import React from 'react'

import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
import HomeNav from './components/homeNav.js'

var HomePage = React.createClass({
	checkUser: function() {
		if (User.getCurrentUser().get('houseId') != undefined) {
			return `houseID: ${User.getCurrentUser().get('houseId')}`
		} else {
			return 'You have not created a new home yet'
		}
	},
	render: function() {
		console.log(User.getCurrentUser().get('houseId'))
		return (
			<div>
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
						<p>{this.checkUser()}</p>
					</div>
			</div>
			)
	}
})

export default HomePage