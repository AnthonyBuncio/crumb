import STORE from './store.js'

import User from './models/userModel.js'
import {HouseModel} from './models/appModel.js'
import {HouseCollection} from './models/appModel.js'
import {ExpenseModel} from './models/appModel.js'
import {ExpenseCollection} from './models/appModel.js'
import {UserCollection} from './models/appModel.js'
import {SendInvite} from './models/appModel.js'


var ACTIONS = {
	//creates new House schema under name created by user
		//POST request
	addHouse: function(formData) {
		var newHouse = new HouseModel(formData)
		newHouse.save({
			userId: User.getCurrentUser().get('_id')
		})
			.done(function(response) {
				ACTIONS._getMyHouse()
				location.hash='home'
			})
			.fail(function(error) {
				alert('error saving your home')
				console.log(error)
			})
	},
	//not deleting, but removing house id from a user model
		//DELETE request
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
	//adds an expense to a household with the form data
		//POST request
	addExpense: function(formData) {
		var newExpense = new ExpenseModel(formData)
		newExpense.save({
			userId: User.getCurrentUser().get('_id'),
			house: User.getCurrentUser().get('house').id
		})
			.done(function(response) {
				//alert('new expense has been added!')
				ACTIONS._getHouseExpenses()
			})
			.fail(function(error) {
				alert('error saving your expense!')
				console.log(error)
			})
	},
	//mark expense as paid/unpaid
		//PUT request
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
	//delete expense from database
		//DELETE request
	deleteExpense: function(model) {
		model.destroy()
			.done(ACTIONS._getHouseExpenses())
			.fail(function(error) {
				console.log('delete failed', error)
			})
	},
	//gets ALL data for OWNER ONLY
	_getAllUserData: function() {
		ACTIONS._getHouseMembers()
		ACTIONS._getMyHouse()
		ACTIONS._getHouseExpenses()
	},
	//gets ALL data for SINGLE MEMBER
	_getMyUserData: function() {
		ACTIONS._getMyHouse()
		ACTIONS._getMyExpenses()
	},
	//retrieves data of all members within a house
		//GET request
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
	//retrieves data of the current users house
		//GET request
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
	//retrieves data of all expenses from all members within a house
		//GET request
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
	//retrieves data of ONLY the current user
		//GET request
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
				//alert('you have logged out!')
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
	//PUT request
	changeUserName: function(formData) {
		var currentUser = User.getCurrentUser()
		currentUser.set(formData)
		currentUser.save()
			.done(function(response) {
				//alert(`Your name has been changed to ${response.name}`)
			})
			.fail(function(error) {
				console.log(error)
			})
	},
	//PUT request
	changeUserEmail: function(formData) {
		var currentUser = User.getCurrentUser()
		currentUser.set(formData)
		currentUser.save()
			.done(function(response) {
				//alert(`Your email has been changed to ${response.email}`)
			})
			.fail(function(error) {
				console.log(error)
			})
	},
	//sends a get request to the backend that will run a script with data passed
		//sending an email requires:
			//1. add a 'get' route to the script that can be reached from client side
			//2. create a new model, directing to the route of the script
			//3. create an action that can recieve data, if preferred
	sendInvite: function(formData) {
		//can be removed from 'STORE.data' and can just be new instance of model
			//i.e. var sendEmail = new SendInvite()
		var sendEmail = STORE.get('invite')
		sendEmail.fetch({
			data: {
				email: formData,
				houseId: User.getCurrentUser().get('house'),
				name: User.getCurrentUser().get('name')
			}
		})
			.done(function(response) {
				console.log(response)
			})
			.fail(function(error) {
				console.log(error)
			})
	}
}

export default ACTIONS