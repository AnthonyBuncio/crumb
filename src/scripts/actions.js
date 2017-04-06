import STORE from './store.js'

import User from './models/userModel.js'
import {HouseModel} from './models/appModel.js'
import {HouseCollection} from './models/appModel.js'
import {ExpenseModel} from './models/appModel.js'
import {ExpenseCollection} from './models/appModel.js'
import {UserCollection} from './models/appModel.js'


var ACTIONS = {
	addHouse: function(formData) {
		var newHouse = new HouseModel(formData)
		newHouse.save({
			userId: User.getCurrentUser().get('_id')
		})
			.done(function(response) {
				alert('saved your home!')
				console.log(response)
			})
			.fail(function(error) {
				alert('error saving your home')
				console.log(error)
			})
	},
	addExpense: function(formData) {
		var newExpense = new ExpenseModel(formData)
		newExpense.save({
			userId: User.getCurrentUser().get('_id')
		})
			.done(function(response) {
				alert('new expense has been added!')
				console.log(response)
			})
			.fail(function(error) {
				alert('error saving your expense!')
				console.log(error)
			})

	},
	_getAllUserData: function() {
		ACTIONS._getHouseMembers()
		ACTIONS._getMyHouse()
		ACTIONS._getHouseExpenses()
	},
	_getHouseMembers: function() {
		var myMembers = STORE.get('houseMembers')
		myMembers.fetch({
			data: {
				house: User.getCurrentUser().get('house')
			}
		})
			.done(function() {
				STORE.set({
					houseMembers: myMembers
				})
			})
			.fail(function(error) {
				console.log(error)
			})
	},
	_getMyHouse: function() {
		var fetchMyHouse = STORE.get('myHouse')
		fetchMyHouse.fetch({
			data: {
				_id: User.getCurrentUser().get('house')
			}
		})
			.done(function() {
				STORE.set({
					myHouse: fetchMyHouse
				})
			})
			.fail(function(error) {
				console.log(error)
			})
	},
	_getHouseExpenses: function() {
		var myExpenses = STORE.get('houseExpenses')
		myExpenses.fetch({
			data: {
				house: User.getCurrentUser().get('house')
			}
		})
			.done(function() {
				STORE.set({
					houseExpenses: myExpenses
				})
			})
			.fail(function(error) {
				console.log(error)
			})
	},
	loginUser: function(email, password) {
		User.login(email, password)
			.done(function(response) {
				console.log(response)
				location.hash = 'home'
			})
			.fail(function(error) {
				alert('incorrect email/password combination')
				console.log(error)
			})
	},
	logoutUser: function() {
		User.logout()
			.done(function(response) {
				alert('you have logged out!')
				console.log(response)
			})
			.fail(function(error) {
				alert('an error has occured logging out')
				console.log(error)
			})
	},
	registerUser: function(newUser) {
		User.register(newUser)
			.done(function(response) {
				ACTIONS.loginUser(newUser.email, newUser.password)
			})
			.fail(function(error) {
				alert('an error has occured registering user')
				console.log(error)
			})
	} 
}

export default ACTIONS