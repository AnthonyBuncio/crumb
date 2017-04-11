import React from 'react'
import AmCharts from 'amcharts3'

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
		return <li>
			   	 <h2>{model.get('name')}</h2>
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
				<h2 className="dashboard-house">{this.props.houseModel.map(this._getHouseName)}</h2>
				<h2 className="dashboard-invite">Invite your friends to join your house using this link: <a href={`http://localhost:3000/#signup/${User.getCurrentUser().get('house')}`}>http://localhost:3000/#signup/{User.getCurrentUser().get('house')}</a></h2>
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