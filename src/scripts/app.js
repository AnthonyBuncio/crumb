import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

import LandingPage from './views/landingPage.js'
import SignupPage from './views/signupPage.js'
import LoginPage from './views/loginPage.js'

const app = function() {
  var Router = Backbone.Router.extend({
  	routes : {
  		"home" : "showHome",
  		"signup" : "showSignup",
  		"login" : "showLogin",
  		"*default" : "handleDefault"
  	},
  	showHome: function() {
  		ReactDOM.render(<LandingPage />, document.querySelector('.container'))
  	},
  	showSignup: function() {
  		ReactDOM.render(<SignupPage />, document.querySelector('.container'))
  	},
  	showLogin: function() {
  		ReactDOM.render(<LoginPage />, document.querySelector('.container'))
  	},
  	handleDefault: function() {
  		location.hash = "home"
  	}
  })
  new Router
  Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..