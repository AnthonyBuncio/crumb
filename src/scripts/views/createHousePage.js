import React from 'react'

import HomeNav from './components/homeNav.js'
import HouseForm from './components/createHouseForm.js'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'

var MakeHousePage = React.createClass({
	componentWillMount: function() {
		ACTIONS._getAllUserData()
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
	_checkForHouse: function() {
		if (User.getCurrentUser().get('house') != undefined) {
			return <HasHouse />
		}
		return <NoHouse />
	},
	render: function() {
		console.log('house page state', this.state)
		return (
			<div>
				<HomeNav />
				{this._checkForHouse()}
			</div>
			)
	}
})

var HasHouse = React.createClass({
	render: function() {
		return (
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

				<p>You already own a house</p>
			</div>
			)
	}
})

var NoHouse = React.createClass({
	render: function() {
		return (
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

				<HouseForm />
			</div>
			)
	}
})

export default MakeHousePage