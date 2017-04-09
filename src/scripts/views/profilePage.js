import React from 'react'

import HomeNav from './components/homeNav.js'
import User from '../models/userModel.js'

var ProfilePage = React.createClass({
	_checkForOwner: function() {
		console.log(User.getCurrentUser().get('isOwner'))
	},
	render: function() {
		console.log(User.getCurrentUser().get('isOwner'))
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

						<p>Here you can edit your profile, such as name, email, (house name?)</p>
						<h2>Edit name: </h2>
						<input type='text' placeholder='name'></input>
						<h2>Edit email: </h2>
						<input type='text' placeholder='email'></input>
						{this._checkForOwner}
					</div>
			</div>
			)
	}
})

export default ProfilePage