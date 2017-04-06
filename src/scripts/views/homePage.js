import React from 'react'

import ACTIONS from '../actions.js'
import STORE from '../store.js'
import User from '../models/userModel.js'
import HomeNav from './components/homeNav.js'

var HomePage = React.createClass({
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
					memberColl= {this.state.houseMembers}/>
		} 
		return <NoHouse />
	},
	render: function() {
		console.log('@ homepage, state of app', this.state)
		return (
			<div>
				<HomeNav />
				{this._checkForHouse()}
			</div>
			)
	}
})

// All collections are passed in by props from smart component above
var HasHouse = React.createClass({
	_getHouseName: function(model) {
		return model.get('name')
	},
	_getHouseMembers: function(model) {
		var _nameToUpperCase = model.get('name').charAt(0).toUpperCase() + model.get('name').slice(1)
		return <li>{_nameToUpperCase}</li>
	},
	_getHouseExpenses: function(model) {
		return <li>
				 <h3>{model.get('category')}</h3>
				 <p>amount: ${model.get('amount')}</p>
			   </li>
	},
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

				<h1>Invite your friends to join your house using this link: http://localhost:3000/#signup/{User.getCurrentUser().get('house')}</h1>
				<br />
				<h2>Your House: {this.props.houseModel.map(this._getHouseName)}</h2>
				<h2>House Members</h2>
					<ul>
						{this.props.memberColl.map(this._getHouseMembers)}
					</ul>
				<h2>House Expenses</h2>
					<ul>
						{this.props.expenseColl.map(this._getHouseExpenses)}
					</ul>
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

				<h1>Welcome to my amazing finance tracking app, <span>{User.getCurrentUser().get('name')}</span>. We are currently under construction. Please come back in 2-3 weeks. Thank you for your cooperation!</h1>
				<br />
				<h1>You are currently not linked to a House. <a href="#createhouse">Click here</a> to create a new home to start keeping track!</h1>
			</div>
			)
	}
})

export default HomePage