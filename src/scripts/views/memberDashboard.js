import React from 'react'
import {Line} from 'react-chartjs-2'
import $ from 'jquery'
import bootstrap from 'bootstrap'

import ACTIONS from '../actions.js'
import STORE from '../store.js'
import User from '../models/userModel.js'
import HomeNav from './components/homeNav.js'

var MemberDashboard = React.createClass({
	componentWillMount: function() {
		ACTIONS._getMyUserData()
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
		return (
			<div className="page-wrapper">
				<HomeNav />
				<ShowData 
					houseModel= {this.state.myHouse}
					expenseColl= {this.state.houseExpenses} />
			</div>
			)
	}
})

var ShowData = React.createClass({
	_getHouseName: function(model) {
		return model.get('name')
	},
	_getDate: function(model) {
		var date = model.get('createdAt'),
			month = [date.slice(5,6), date.slice(6,7)],
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
	returnAsTable: function(model) {
		return (
			<tbody>
				<tr>
					<td>{this._getDate(model)}</td>
					<td>{model.get('category')}</td>
					<td>$ {model.get('amount')}</td>
				</tr>
			</tbody>
			)
	},
	checkWholeArray: function(arr) { 
		var isPaid = []
		for (var i = 0; i < this.props.expenseColl.models.length; i++) {
			var model = this.props.expenseColl.models[i]
			if (model.get('isPaid') === false) {
				isPaid.push(model)
			}
		}
		if (isPaid.length > 0) {
			return (
				<table className="expense-table">
					<thead>
						<tr className="table-header">
							<th>Posted</th>
							<th>Category</th>
							<th>Amount</th>
						</tr>
					</thead>
					{isPaid.map(this.returnAsTable)}
				</table>
				)
			isPaid.map(this.returnAsTable)
		} else {
			return <h2>You are up to date with your expenses</h2>
		}
	},
	mapToArray: function(model){
		var date = model.get('createdAt'),
			month = [date.slice(5,6), date.slice(6,7)],
			cal = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
			finalMonth = ''
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

		if (model.get('category') === 'Rent') {
			return ({
				label: finalMonth,
				backgroundColor: "rgba(255, 99, 132, 0.5)",
	            borderColor: "rgba(255,99,132,1)",
	            radius: 5,
	            data: [model.get('amount')]
			})
		} else if (model.get('category') === 'Electricity') {
			return ({
				label: finalMonth,
				backgroundColor: "rgba(54, 162, 235, 0.5)",
	            borderColor: "rgba(54, 162, 235,1)",
	            radius: 5,
	            data: [null, model.get('amount')]
			})
		} else if (model.get('category') === 'Gas') {
			return ({
				label: finalMonth,
				backgroundColor: "rgba(255, 206, 86, 0.5)",
	            borderColor: "rgba(255, 206, 86,1)",
	            radius: 5,
	            data: [null, null, model.get('amount')]
			})
		} else if (model.get('category') === 'Utilities') {
			return ({
				label: finalMonth,
				backgroundColor: "rgba(75, 192, 192, 0.5)",
	            borderColor: "rgba(75, 192, 192,1)",
	            radius: 5,
	            data: [null, null, null, model.get('amount')]
			})
		} else if (model.get('category') === 'Supplies') {
			return ({
				label: finalMonth,
				backgroundColor: "rgba(153, 102, 255, 0.5)",
	            borderColor: "rgba(153, 102, 255,1)",
	            radius: 5,
	            data: [null, null, null, null, model.get('amount')]
			})
		} else if (model.get('category') === 'Groceries') {
			return ({
				label: finalMonth,
				backgroundColor: "rgba(255, 159, 64, 0.5)",
	            borderColor: "rgba(255, 159, 64,1)",
	            radius: 5,
	            data: [null, null, null, null, null, model.get('amount')]
			})
		} else if (model.get('category') === 'Other') {
			return ({
				label: finalMonth,
				backgroundColor: "rgba(224, 228, 204, 0.5)",
	            borderColor: "rgba(224, 228, 204, 1)",
	            radius: 5,
	            data: [null, null, null, null, null, null, model.get('amount')]
			})
		}
	},
	_showEmailModal: function() {
		bootbox.prompt("Enter email:", function(result){
			ACTIONS.sendInvite(result)
		})
	},
	render: function() {
		var chartData = {
			labels: ["Rent", "Electricity", "Gas", "Utilities", "Supplies", "Groceries", "Other"],
			datasets: this.props.expenseColl.map(this.mapToArray)
		}
		var chartOptions = {
			legend: {
				display: false
			},
		    scales: {
		        yAxes: [{
		            ticks: {
		                beginAtZero: true
		            }
		        }]
		    },
		    tooltips: {
		        enabled: true,
		        mode: 'single',
		        callbacks: {
		            label: function(tooltipItems, data) {
		                return '$' + tooltipItems.yLabel;
		            }
		        }
		    }
		}
		return (
			<div className="main-container">
				<h1 className="dashboard-title">Dashboard</h1>
				<h2 className="dashboard-house">{this.props.houseModel.models.map(this._getHouseName)}</h2>
				<div className="button-small">
					<button type='button' onClick={this._showEmailModal}>Invite your friends!</button>
				</div>
				<br/>
				<Line data={chartData} options={chartOptions} width="500px" height="300px"/>
				<br/>
				<h2 className="center-header-med">My Current Expenses</h2>
					{this.checkWholeArray()}				
			</div>
			)
	}
})

export default MemberDashboard