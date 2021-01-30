import React from 'react';
import keyboardLogo from './keyboard.png';
import './toolbar.css';
import {Nav, NavDropdown} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import {LinkContainer} from 'react-router-bootstrap';
import {Content} from '../Content/Content';


class Toolbar extends React.Component{
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
	    console.log("Loaded toolbar");
	}

	render() {
		return (
			<Navbar bg="light" expand="lg">
			  <Navbar.Brand href="#home">Programming Internet Applications</Navbar.Brand>
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
				  <Nav.Link href="#home">Home</Nav.Link>
				  <NavDropdown title="Accounts" id="accounts">
					<NavDropdown.Item key="1" href="/accounts" title="list_accounts">List Accounts</NavDropdown.Item>
					<NavDropdown.Item key="2" href="/account" title="add_account">Add Account</NavDropdown.Item>
				  </NavDropdown>
				  <NavDropdown title="Tasks" id="tasks">
					<NavDropdown.Item key="3" href="/tasks" title="list_tasks">List Tasks</NavDropdown.Item>
					<NavDropdown.Item key="4" href="/task" title="add_task">Add Task</NavDropdown.Item>
				  </NavDropdown>
				</Nav>
				
			  </Navbar.Collapse>
			</Navbar>
			
		);
	}
}

export {Toolbar};