import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './content.css';

class Content extends React.Component{

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
	    console.log("Content component");
	}

	render() {
		return (
			<div className="container">
				<h1>Welcome on homepage</h1>
			</div>			
		);
	}
}

export {Content};