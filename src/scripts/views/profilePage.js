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
	_checkForOwner: function() {
		if (User.getCurrentUser().get('isOwner')) {
			return <OwnerPrivilege members={STORE.get('houseMembers')}/>
		}
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
						{this._checkForOwner()}
					</div>
			</div>
			)
	}
})

var OwnerPrivilege = React.createClass({
	_makeList: function(model) {
		if (model.get('isOwner') === false) {
			return <option value={model.get('_id')}>{model.get('name')}</option>
		}
	},
	_makeOwner: function(eventObj) {
		eventObj.preventDefault()
		var formEl = eventObj.target,
			formData = formEl.makeOwner.value
		formEl.reset()
		console.log(formData)
	},
	render: function() {
		return (
			<form onSubmit={this._makeOwner} className="make-owner-form">
				<select name='makeOwner' className="owner-form">
					<option selected="selected" disabled>Members</option>
					{this.props.members.map(this._makeList)}
				</select>
				<button type='submit'>Give owner access.</button>
			</form>
			)
	}
})

export default ProfilePage