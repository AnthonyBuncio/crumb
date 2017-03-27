import STORE from './store.js'

import User from './models/userModel.js'

var ACTIONS = {
	loginUser: function(email, password) {
		User.login(email, password)
			.done(function(response) {
				alert('this user has logged in')
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
				alert('a new user has been registered')
				console.log(response)
			})
			.fail(function(error) {
				alert('an error has occured registering user')
				console.log(error)
			})
	} 
}

export default ACTIONS