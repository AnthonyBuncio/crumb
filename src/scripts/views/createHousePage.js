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
			return <HasHouse 
					houseModel= {this.state.myHouse}
					expenseColl= {this.state.houseExpenses}
					memberColl= {this.state.houseMembers}
					/>
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
	_getHouseName: function(model) {
		return model.get('name')
	},
	_clickConfirmation: function() {
		console.log('button was clicked')
		location.hash="leavehouse"
	},
	render: function() {
		console.log(this.props.houseModel)
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

				<h1>You are already a member of the house: {this.props.houseModel.map(this._getHouseName)}</h1>
				<br />
				<h2>If you would like to leave this house</h2>
				<button type='button' onClick={this._clickConfirmation}>Click Here</button>
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