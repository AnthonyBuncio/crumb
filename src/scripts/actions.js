import STORE from './store.js'

import User from './models/userModel.js'
import {HouseModel} from './models/houseModel.js'

var ACTIONS = {
	addHouse: function(formData) {
		var newHouse = new HouseModel(formData)
		newHouse.save()
			.done(function(response) {
				alert('saved your home!')
				User.getCurrentUser().get('houseId').push(response)
			})
			.fail(function(error) {
				alert('error saving your home')
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