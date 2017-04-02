import Backbone from 'backbone'
import {HouseCollection} from './models/houseModel.js'

var STORE = Object.assign({}, Backbone.Events, {
	data: {
		houseCollection: new HouseCollection()
	}
})

export default STORE