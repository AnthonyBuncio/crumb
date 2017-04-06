import Backbone from 'backbone'

import User from './userModel.js'

export var HouseModel = Backbone.Model.extend({
	urlRoot: '/api/homes',
	idAttribute: '_id'
})

export var HouseCollection = Backbone.Collection.extend({
	model: HouseModel,
	url: '/api/homes',
})

export var ExpenseModel = Backbone.Model.extend({
	urlRoot: '/api/expenses',
	idAttribute: '_id'
})

export var ExpenseCollection = Backbone.Collection.extend({
	model: ExpenseModel,
	url: '/api/expenses'
})

export var UserCollection = Backbone.Collection.extend({
	model: User,
	url: '/api/users'
})