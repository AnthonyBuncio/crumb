import React from 'react'

import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
import HomeNav from './components/homeNav.js'

var HomePage = React.createClass({

	render: function() {
		return (
			<div>
				<HomeNav />
				<h1>WELCOME TO MY AMAZING FINANCE TRACKING APP, <span>{User.getCurrentUser().get('name')}</span>. WE ARE CURRENTLY UNDER CONSTRUCTION. PLEASE COME BACK IN 2-3 WEEKS. THANK YOU FOR YOUR COOPERATION!</h1>
			</div>
			)
	}
})

export default HomePage