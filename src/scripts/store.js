import Backbone from 'backbone'
import {HouseCollection} from './models/appModel.js'
import {ExpenseCollection} from './models/appModel.js'
import {UserCollection} from './models/appModel.js'
import moment from 'moment'

var STORE = Object.assign({}, Backbone.Events, {
	data: {
		myHouse: new HouseCollection(),
		houseMembers: new UserCollection(),
		houseExpenses: new ExpenseCollection(),
		deadline: moment()
	},
	get: function(prop) {
		if (this.data[prop] === undefined) {
			throw new Error('the store doesn\'t have a property called ' + prop)
		}
		return this.data[prop]
	},
	set: function(obj) {
		this.data = Object.assign(this.data, obj)
		this.trigger('dataUpdated')
	}
})

export default STORE