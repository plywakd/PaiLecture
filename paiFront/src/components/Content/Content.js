import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './content.css';
import axios from 'axios';

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
			<div>
				<h1>content</h1>
			</div>			
		);
	}
}

export {Content};