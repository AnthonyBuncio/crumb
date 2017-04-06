import Backbone from 'backbone'

export var ExpenseModel = Backbone.Model.extend({
	urlRoot: '/api/expenses',
	idAttribute: '_id'
})

export var ExpenseCollection = Backbone.Collection.extend({
	model: ExpenseModel,
	url: '/api/expenses'
})