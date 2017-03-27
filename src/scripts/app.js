import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

import LandingPage from './views/landingPage.js'
import SignupPage from './views/signupPage.js'
import LoginPage from './views/loginPage.js'
import HomePage from './views/homePage.js'

const app = function() {
  var Router = Backbone.Router.extend({
  	routes : {
  		"" : "showLanding",
  		"signup" : "showSignup",
  		"login" : "showLogin",
      "home" : "showHome",
  		"*default" : "handleDefault"
  	},
  	showLanding: function() {
  		ReactDOM.render(<LandingPage />, document.querySelector('.container'))
  	},
  	showSignup: function() {
  		ReactDOM.render(<SignupPage />, document.querySelector('.container'))
  	},
  	showLogin: function() {
  		ReactDOM.render(<LoginPage />, document.querySelector('.container'))
  	},
    showHome: function() {
      ReactDOM.render(<HomePage />, document.querySelector('.container'))
    },
  	handleDefault: function() {
  		location.hash = ""
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