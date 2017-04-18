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

					<h1 className="no-house">You are currently not linked to a House. <a href="#createhouse">Click here</a> to create a new home and start keeping track!</h1>
				</div>
			</div>
			)
	}
})

export default HomePage