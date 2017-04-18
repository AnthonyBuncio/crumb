import React from 'react'

import HomeNav from './components/homeNav.js'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'

var LeaveHousePage = React.createClass({
	render: function() {
		return (
			<div className="page-wrapper confirm-wrapper">
				<HomeNav />
				<Confirmation />
			</div>
			)
	}
})

var Confirmation = React.createClass({
	_removeUser: function() {
		var userModel = User.getCurrentUser()
		console.log(userModel)
		ACTIONS.removeHouse(userModel)
	},
	_sendToHome: function() {
		location.hash="home"
	},
	render: function() {
		console.log('in confirmation page')
		return (
			<div className="main-container leave-confirm">
				<h1>Are you sure? You will be unable to rejoin this house unless you are sent an invitation link.</h1>
				<button type='button' onClick={this._removeUser} className="leave-yes">Yes, kick me out.</button>
				<button type='button' onClick={this._sendToHome} className="leave-no">Nevermind, take me back.</button>
			</div>
			)
	}
})

export default LeaveHousePage