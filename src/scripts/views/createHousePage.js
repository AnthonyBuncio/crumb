import React from 'react'

import HomeNav from './components/homeNav.js'
import HouseForm from './components/createHouseForm.js'

var MakeHousePage = React.createClass({
	render: function() {
		return (
			<div>
				<HomeNav />

				{/* remove once HomeNav is fixed */}
				<br />
				<br />
				<br />
				<br />
				<br />
				
				<HouseForm />
			</div>
			)
	}
})

export default MakeHousePage