import React from 'react'

import User from '../../models/userModel.js'
import ACTIONS from '../../actions.js'

var HomeNav = React.createClass({
	_checkForOwner: function() {
		 if (User.getCurrentUser().get('isOwner')) {
		 	return <IsOwner />
		 } 
		 return <NotOwner />
	},
	render: function() {
		var _nameToUpperCase = User.getCurrentUser().get('name').charAt(0).toUpperCase() + User.getCurrentUser().get('name').slice(1)
		return (
			<div>
				{this._checkForOwner()}
			</div>
			)
	}
})

var IsOwner = React.createClass({
	render: function() {
		var _nameToUpperCase = User.getCurrentUser().get('name').charAt(0).toUpperCase() + User.getCurrentUser().get('name').slice(1)
		return (
			<div className="nav-wrapper">
				<div className="settings-nav-wrapper">
					<p className="menu-title home-button">{_nameToUpperCase}</p>
					<ul className="menu">
						<li>
							<a className="create-nav home-button" href="#createhouse">+ house</a>
						</li>
						<li>
							<a className="home-button" href="#addexpense">+ expenses</a>
						</li>
						<li>
							<a className="settings-nav home-button" href="#myprofile">profile</a>
						</li>
					</ul>
				</div>
				<div className="home-nav-wrapper">
					<a className="home-nav home-button" href="#home">Home</a>
				</div>
				<div className="logout-nav-wrapper">
					<a className="logout-nav home-button" onClick={ACTIONS.logoutUser} href="#landing">Logout</a>
				</div>
			</div>
			)
	}
})

var NotOwner = React.createClass({
	render: function() {
		var _nameToUpperCase = User.getCurrentUser().get('name').charAt(0).toUpperCase() + User.getCurrentUser().get('name').slice(1)
		return (
			<div className="nav-wrapper">
				<div className="settings-nav-wrapper">
					<p className="menu-title home-button">{_nameToUpperCase}</p>
					<ul className="menu">
						<li>
							<a className="create-nav home-button" href="#createhouse">+ house</a>
						</li>
						<li>
							<a className="settings-nav home-button" href="#myprofile">profile</a>
						</li>
					</ul>
				</div>
				<div className="home-nav-wrapper">
					<a className="home-nav home-button" href="#home">Home</a>
				</div>
				<div className="logout-nav-wrapper">
					<a className="logout-nav home-button" onClick={ACTIONS.logoutUser} href="#landing">Logout</a>
				</div>
			</div>
			)
	}
})

export default HomeNav