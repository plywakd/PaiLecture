import React, {Component} from 'react';
import {Content} from './components/Content/Content';
import {Toolbar} from './components/Toolbar/Toolbar';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{

	constructor(props) {
		super(props);
		this.state = {
            
		}
	}
	
	componentDidMount() {
	    console.log("Loaded App js");
	}
	
	
	render() {
		return (
			<React.Fragment>
				<div className="main-container">
					<div className="row-container">
						<Toolbar></Toolbar>
					</div>
					<div className="row-container">
						<Content></Content>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default App;