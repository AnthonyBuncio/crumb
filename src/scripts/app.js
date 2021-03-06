import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

import User from './models/userModel.js'
import LandingPage from './views/landingPage.js'
import SignupPage from './views/signupPage.js'
import SignupPageId from './views/signupPageId.js'
import LoginPage from './views/loginPage.js'
import OwnerDashboard from './views/ownerDashboard.js'
import MemberDashboard from './views/memberDashboard.js'
import HomePage from './views/homePage.js'
import MakeHousePage from './views/createHousePage.js'
import AddExpensePage from './views/addExpensePage.js'
import ProfilePage from './views/profilePage.js'
import LeaveHousePage from './views/leaveHousePage.js'
import MyExpenses from './views/myExpenses.js'

const app = function() {
  var Router = Backbone.Router.extend({
  	routes : {
  		"" : "showLanding",
      "home" : "showHome",
      "login" : "showLogin",

  		"signup" : "showSignup",
      "signup/:id" : "showSignupToHouse",

      "createhouse" : "makeHouse",
      "leavehouse" : "removeHouse",

      "addexpense" : "showExpenseForm",

      "myprofile" : "showProfile",
  		"*default" : "handleDefault"
  	},
  	showLanding: function() {
  		ReactDOM.render(<LandingPage />, document.querySelector('.container'))
  	},
    showHome: function() {
      if (User.getCurrentUser().get('house')) {
        if (User.getCurrentUser().get('isOwner')) {
          return ReactDOM.render(<OwnerDashboard />, document.querySelector('.container'))
        } 
        return ReactDOM.render(<MemberDashboard />, document.querySelector('.container'))
      }
      return ReactDOM.render(<HomePage />, document.querySelector('.container'))
    },
  	showSignup: function() {
  		ReactDOM.render(<SignupPage />, document.querySelector('.container'))
  	},
    showSignupToHouse: function(id) {
      ReactDOM.render(<SignupPageId houseId = {id} />, document.querySelector('.container'))
    },
  	showLogin: function() {
  		ReactDOM.render(<LoginPage />, document.querySelector('.container'))
  	},
    makeHouse: function() {
      ReactDOM.render(<MakeHousePage />, document.querySelector('.container'))
    },
    removeHouse: function() {
      ReactDOM.render(<LeaveHousePage />, document.querySelector('.container'))
    },
    showExpenseForm: function() {
      if (User.getCurrentUser().get('isOwner')) {
        return ReactDOM.render(<AddExpensePage />, document.querySelector('.container'))
      }
      return ReactDOM.render(<MyExpenses />, document.querySelector('.container'))
    },
    showProfile: function() {
      ReactDOM.render(<ProfilePage />, document.querySelector('.container'))
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