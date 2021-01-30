import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './usermenu.css'

class UserMenu extends React.Component{

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
	    console.log("Loaded userMenu");
	}

	render() {
		return (
			<div className="user-menu-container">
				<h4>Hello from userMenu</h4>
				<div className="btn-container">
					<Button variant="dark" disabled>Login</Button>
					<Button variant="dark" disabled={!this.props.isLogged} onClick={this.props.handleProjectList}>Project list</Button>
					<Button variant="dark" disabled={!this.props.isLogged} onClick={this.props.handleStudentList}>Student list</Button>
					<Button variant="dark" disabled={!this.props.isLogged} onClick={this.props.handleTaskList}>Task list</Button>
					<Button variant="dark" disabled={!this.props.isLogged} onClick={this.props.handleAdd}>Add Item</Button>
				</div>
			</div>
		);
	}
}

export {UserMenu};