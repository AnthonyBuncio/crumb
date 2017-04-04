import React from 'react'

import HomeNav from './components/homeNav.js'
import MemberForm from './components/addMemberForm.js'

var AddMembers = React.createClass({
	render: function() {
		return (
			<div>
				<HomeNav />
					<div className="main-container">
						
						{/* remove once HomeNav is fixed */}
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />

						<MemberForm />
					</div>
			</div>
			)
	}
})

export default AddMembers