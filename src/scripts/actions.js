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
				location.hash='home'
				ACTIONS._getAllUserData()
			})
			.fail(function(error) {
				alert('error saving your home')
				console.log(error)
			})
	},
	//not deleting, but removing house id from a user model
	removeHouse: function(model) {
		model.unset('house', { silent: true })
		model.set({
			isOwner: false
		})
		model.save()
			.done(function(response) {
				console.log(response)
				ACTIONS._getAllUserData()
			})
			.fail(function(error) {
				console.log(error)
			})
	},
	giveOwner: function(model) {
		model.set({
			isOwner : true
		})
		model.save()
			.done(function(response) {
				alert(`${model.name} has been granted ownership!`)
			})
			.fail(function(error) {
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
				ACTIONS._getHouseExpenses()
			})
			.fail(function(error) {
				alert('error saving your expense!')
				console.log(error)
			})

	},
	editExpense: function(model, boolean) {
		model.set({
			isPaid : boolean
		})
		model.save()
			.done(function(response) {
				ACTIONS._getHouseExpenses()
			})
			.fail(function(error) {
				console.log(error)
			})
	},
	//remove debt from user in backend
	deleteExpense: function(model) {
		model.destroy()
			.done(ACTIONS._getHouseExpenses())
			.fail(function(error) {
				console.log('delete failed', error)
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
	_getMyExpenses: function() {
		var myExpenses = STORE.get('houseExpenses')
		myExpenses.fetch({
			data: {
				house: User.getCurrentUser().get('house'),
				debtor: User.getCurrentUser().get('_id')
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
	},
	changeUserName: function(formData) {
		var currentUser = User.getCurrentUser()
		currentUser.set(formData)
		currentUser.save()
			.done(function(response) {
				alert(`Your name has been changed to ${response.name}`)
			})
			.fail(function(error) {
				console.log(error)
			})
	},
	changeUserEmail: function(formData) {
		var currentUser = User.getCurrentUser()
		currentUser.set(formData)
		currentUser.save()
			.done(function(response) {
				alert(`Your email has been changed to ${response.email}`)
			})
			.fail(function(error) {
				console.log(error)
			})
	}
}

export default ACTIONS