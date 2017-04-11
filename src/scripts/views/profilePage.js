import React from 'react'

import HomeNav from './components/homeNav.js'
import User from '../models/userModel.js'
import ACTIONS from '../actions.js'
import STORE from '../store.js'

var ProfilePage = React.createClass({
	componentWillMount: function() {
		ACTIONS._getHouseMembers()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	componentWillUnmount: function() {
		STORE.off('dataUpdated')
	},
	getInitialState: function() {
		return STORE.data
	},
	_changeName: function(eventObj) {
		eventObj.preventDefault()
		var formEl = eventObj.target,
			newName = formEl.name.value
		if (newName === '') {
			alert("Please enter a valid name.")
		} else {
			var nameToUpperCase = newName.charAt(0).toUpperCase() + newName.slice(1),
				formData = {
				'name' : nameToUpperCase
				}
			formEl.reset()
			ACTIONS.changeUserName(formData)
		}
	},
	_changeEmail: function(eventObj) {
		eventObj.preventDefault()
		var formEl = eventObj.target,
			input = formEl.email.value
		if (input === '') {
			alert("Please enter a valid email.")
		} else {
			var formData = {
				'email' : formEl.email.value
			}
			formEl.reset()
			ACTIONS.changeUserEmail(formData)
		}
	},
	render: function() {
		return (
			<div>
				<HomeNav />
					<div className="main-container profile-page">
						<h2>Edit name: </h2>
						<form onSubmit={this._changeName}>
							<input type='text' name='name' placeholder='Enter Name'></input>
							<div>
								<button type='submit'>Change my name.</button>
							</div>
						</form>
						<h2>Edit email: </h2>
						<form onSubmit={this._changeEmail}>
							<input type='text' name='email' placeholder='Enter Email'></input>
							<div>
								<button type='submit'>Change my email.</button>
							</div>
						</form>
					</div>
			</div>
			)
	}
})

export default ProfilePage