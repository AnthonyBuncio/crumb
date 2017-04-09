import React from 'react'

import ACTIONS from '../actions.js'
import STORE from '../store.js'
import User from '../models/userModel.js'
import HomeNav from './components/homeNav.js'

var Dashboard = React.createClass({
	componentWillMount: function() {
		if (User.getCurrentUser().get('house')) {
			ACTIONS._getAllUserData()
		}
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
			return <HasHouse 
					houseModel= {this.state.myHouse}
					expenseColl= {this.state.houseExpenses}
					memberColl= {this.state.houseMembers}/>
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
		return <li>
			   	 <h2>{_nameToUpperCase}</h2>
			   	 <p>Debt: ${model.get('debt')}</p>
			   </li>
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
				
				<h1 className="dashboard-title">Dashboard</h1>
				<br />
				<br />
				<h2 className="dashboard-invite">Invite your friends to join your house using this link: http://localhost:3000/#signup/{User.getCurrentUser().get('house')}</h2>
				<br />
				<h2 className="dashboard-house">Your House: {this.props.houseModel.map(this._getHouseName)}</h2>
				<h2 className="dashboard-members">House Members</h2>
					<ul >
						{this.props.memberColl.map(this._getHouseMembers)}
					</ul>
				<h2>Current Expenses</h2>
					<ul>
						{this.props.expenseColl.map(this._getHouseExpenses)}
					</ul>
			</div>
			)
	}
})

export default Dashboard