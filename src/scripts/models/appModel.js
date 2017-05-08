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
	//return expenses in order from newest(top) to oldest(bottom)
		//usually places newest expenses at bottom
	comparator: function(model) {
		return new Date(model.get('createdAt')).getTime() * -1
	},
	model: ExpenseModel,
	url: '/api/expenses'
})

export var UserCollection = Backbone.Collection.extend({
	model: User,
	url: '/api/users'
})

export var SendInvite = Backbone.Model.extend({
	urlRoot: '/api/sendInvite'
})