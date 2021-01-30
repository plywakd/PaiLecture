import React, {Component} from 'react';
import {Content} from './components/Content/Content';
import {Toolbar} from './components/Toolbar/Toolbar';
import {AccountMenu} from './components/AccountMenu/AccountMenu';
import {TaskMenu} from './components/TaskMenu/TaskMenu';
import {AccountEdit} from './components/AccountEdit/AccountEdit';
import {TaskEdit} from './components/TaskEdit/TaskEdit';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from "react-router-dom";

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
		<div>
			<BrowserRouter>
				<Toolbar/>
				<Route exact path="/" component={Content}/>
				<Route path="/accounts" component={AccountMenu}/>
				<Route path="/account" component={AccountEdit}/>
				<Route path="/tasks" component={TaskMenu}/>
				<Route path="/task" component={TaskEdit}/>
			</BrowserRouter>
		</div>
		);
	}
}

export default App;