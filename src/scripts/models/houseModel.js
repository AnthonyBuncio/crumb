import Backbone from 'backbone'

export var HouseModel = Backbone.Model.extend({
	urlRoot: '/api/homes',
	idAttribute: '_id'
})

export var HouseCollection = Backbone.Collection.extend({
	model: HouseModel,
	url: '/api/homes'
})