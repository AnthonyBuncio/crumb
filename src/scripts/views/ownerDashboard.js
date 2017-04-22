import React from 'react'
import {Bar} from 'react-chartjs-2'
import $ from 'jquery'

// Chart title font color
Chart.defaults.global.defaultFontColor = 'rgba(0, 0, 0, 1)';
Chart.defaults.global.defaultFontSize = 14;

import ACTIONS from '../actions.js'
import STORE from '../store.js'
import User from '../models/userModel.js'
import HomeNav from './components/homeNav.js'

var OwnerDashboard = React.createClass({
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
	render: function() {
		console.log('the state', this.state)
		return (
			<div className="page-wrapper">
				<HomeNav />
				<ShowData 
					houseModel= {this.state.myHouse}
					expenseColl= {this.state.houseExpenses}
					memberColl= {this.state.houseMembers} />
			</div>
			)
	}
})

var ShowData = React.createClass({
	_getHouseName: function(model) {
		return model.get('name')
	},
	_getHouseMembers: function(model) {
		var debt = 0
		for (var i = 0; i < model.get('expenses').length; i++) {
			var expenseModel = model.get('expenses')[i]
			if (expenseModel.isPaid === false) {
				debt += expenseModel.amount
			} 
		}

		return <li>
			   	 <h2>{model.get('name')}</h2>
			   	 <p>Debt: ${debt}</p>
			   </li>
	},
	_getHouseExpenses: function(model) {
		return <li>
				 <h3>{model.get('category')}</h3>
				 <p>amount: ${model.get('amount')}</p>
			   </li>
	},
	_membersArray: function() {
		var labelArray = []
		for (var i = 0; i < this.props.memberColl.models.length; i++) {
			var model = this.props.memberColl.models[i]
			labelArray.push(model.get('name'))
		}
		return labelArray
	},
	_debtArray: function() {
		var debtArray = []
		var userDebt = 0
		for (var i = 0; i < this.props.memberColl.models.length; i++) {
			var model = this.props.memberColl.models[i]
			for (var x = 0; x < model.get('expenses').length; x++) {
				var expenseModel = model.get('expenses')[x]
				if (expenseModel.isPaid === false) {
					userDebt += expenseModel.amount
				}
			}
			debtArray.push(userDebt)
			userDebt = 0
		}
		return debtArray
	},
	_showEmailModal: function() {
		bootbox.prompt("Enter email:", function(result){
			ACTIONS.sendInvite(result)
		})
	},
	render: function() {
		var chartData = {
		    labels: this._membersArray(),
		    datasets: [{
		            label: "Current Debt",
		            backgroundColor: [
		                'rgba(255, 99, 132, 0.4)',
		                'rgba(54, 162, 235, 0.4)',
		                'rgba(255, 206, 86, 0.4)',
		                'rgba(75, 192, 192, 0.4)',
		                'rgba(153, 102, 255, 0.4)',
		                'rgba(255, 159, 64, 0.4)'
		            ],
		            borderColor: [
		                'rgba(255,99,132,1)',
		                'rgba(54, 162, 235, 1)',
		                'rgba(255, 206, 86, 1)',
		                'rgba(75, 192, 192, 1)',
		                'rgba(153, 102, 255, 1)',
		                'rgba(255, 159, 64, 1)'
		            ],
		            highlightColor: [
		            	'rgba(255,99,132,0.5)',
		            	'rgba(54, 162, 235, 0.5)',
		            	'rgba(255, 206, 86, 0.5)',
		            	'rgba(75, 192, 192, 0.5)',
		            	'rgba(153, 102, 255, 0.5)',
		            	'rgba(255, 159, 64, 0.5)'
		            ],
		            borderWidth: 1,
		            data: this._debtArray()
		        }]
		}
		var chartOptions = {
			legend: {
				display: false
			},
			scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },                                       
                        }],
                     xAxes: [{
                    ticks: {
                        beginAtZero:true
                    },

                }]
            },
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function(tooltipItems, data) { 
                        return 'Current debt: $' + tooltipItems.yLabel;
                    }
                }
            }
		}
		return (
			<div className="main-container">
				<h1 className="dashboard-title">Dashboard</h1>
				<h2 className="dashboard-house">{this.props.houseModel.map(this._getHouseName)}</h2>
				<div className="button-small">
					<button type='button' onClick={this._showEmailModal}>Invite your friends!</button>
				</div>
				<br/>
				<Bar data={chartData} options={chartOptions} />
				<h2 className="center-header-med">Current Expenses</h2>
				<Table expenseColl={this.props.expenseColl} />
			</div>
			)
	}
})

var Table = React.createClass({
	_listUnpaidExpenses: function(model) {
		if (model.get('isPaid') === false) {
			return <ExpenseItem listItem={model} />
		}
	},
	render: function() {
		return (
			<table className="expense-table">
				<thead>
					<tr className="table-header">
						<th>Name</th>
						<th>Posted</th>
						<th>Category</th>
						<th>Due By</th>
						<th>Amount</th>
					</tr>
				</thead>
				{this.props.expenseColl.map(this._listUnpaidExpenses)}
			</table>
			)
	}
})

var ExpenseItem = React.createClass({
	_getDate: function(date) {
		var month = [date.slice(5,6), date.slice(6,7)],
			day = [date.slice(8,9), date.slice(9,10)],
			cal = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
			finalMonth = '',
			finalDay = ''
		if (month[1] < 10) {
			var currentMonth = (month[1]) - 1
			finalMonth = cal[currentMonth]
		}
		else if (month[0] === 1) {
			var currentMonth = (month[1]) - 1
			finalMonth = cal[currentMonth]
		}
		else if (month[0] === 0 && month[1] === 0) {
			finalMonth = cal[1]
		}

		if (day[0] > 0) {
			finalDay = day.join('')
		} 
		else {
			finalDay = day[1]
		}
		return finalMonth+ ' ' +finalDay
	},
	render: function() {
		var model = this.props.listItem
		return (
			<tbody>
				<tr>
					<td>{model.get('debtor').name}</td>
					<td>{this._getDate(model.get('createdAt'))}</td>
					<td>{model.get('category')}</td>
					<td>{this._getDate(model.get('deadline'))}</td>
					<td>${model.get('amount')} </td>
				</tr>
			</tbody>
			)
	}
})

export default OwnerDashboard