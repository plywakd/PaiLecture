import React from 'react';
import Form from 'react-bootstrap/Form';
import {ModelForm} from './ModelForm.js';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './SubMenu.css';

class SubMenu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			itemToUpdate: Object,
			updateMenu: false,
		}
		this.handleProjectUpdate = this.handleProjectUpdate.bind(this);
		this.handleParam = this.handleParam.bind(this);
		this.handleUpdateMenu = this.handleUpdateMenu.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleBack = this.handleBack.bind(this);
	}

	componentDidMount() {
		console.log("SubMenu component");
	}

	handleProjectUpdate(event) {
		event.preventDefault();
	}
	
	
	handleParam = (toRecognize) => {
		if (typeof (toRecognize) === 'string') {
			return toRecognize
		}
		if (typeof (toRecognize) === 'object') {
			if(this.props.tasksMenu === true){
				return toRecognize.name
			}
			else if(this.props.projectMenu === true){
				let tasks =[];
				toRecognize.forEach(task => {
					tasks.push(task.name);
					tasks.push(<br />);
				});
				return tasks;
			}
        }
		
		return ""
    }
	
	handleUpdateMenu = (item) => {
		this.setState({itemToUpdate: item}, () => this.setState({updateMenu: true}, () => console.log(this.state.updateMenu)));
	}

	handleBack(event) {
		event.preventDefault();
		this.setState({updateMenu: false});
	}
	
	handleDelete = (item) => {
		let api_endpoint = ""
		if(this.props.projectMenu === true){
			api_endpoint="projects/"+item.projectId;
		}
		else if(this.props.studentMenu === true){
			api_endpoint="students/"+item.studentId;
		}
		else if(this.props.taskMenu === true){
			api_endpoint="tasks/"+item.taskId;
		}
		
		
		const backend_url = 'http://localhost:8081/api/'+api_endpoint;
		var config = {
			method: 'delete',
			url: backend_url,
			headers: { 
				"Access-Control-Allow-Origin": "*",
				'Authorization': 'Basic YWRtaW46YWRtaW4=',
			},
			params: {
			}
		};

		axios(config)
		.then(response => {console.log(response.status);
		});
	}

	render() {
		let subMenu;
		let resData;
		let headers;
		let header;
		if (this.props.isLogged === false) {
			subMenu =
				(<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" name="username" onChange={this.props.handleChange} placeholder="Enter username" />
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" name="password" onChange={this.props.handleChange} placeholder="Password" />
					</Form.Group>

					<Button variant="primary" type="submit" onClick={this.props.handleLogin}>
						Login
					</Button>
		<Button variant="primary" type="submit" onClick={() => this.props.handleRegister}>
						Register
					</Button>
				</Form>);
		}
		else if (this.props.isLogged === true && this.props.projectMenu === false && this.props.studentMenu === false && this.props.taskMenu === false && this.props.addMenu === false) {
			subMenu = (
				<h2> Welcome {this.props.username} </h2>)
		}
		else if (this.props.isLogged === true && this.props.projectMenu === true && this.state.updateMenu === false) {
			resData = this.props.projectList;
			headers = Object.values(resData)[0];
			header = Object.keys(headers);
		}
		else if (this.props.isLogged === true && this.props.studentMenu === true && this.state.updateMenu === false) {
			resData = this.props.studentList;
			headers = Object.values(resData)[0];
			header = Object.keys(headers);
		}
		else if (this.props.isLogged === true && this.props.taskMenu === true && this.state.updateMenu === false) {
			resData = this.props.taskList;
			headers = Object.values(resData)[0];
			header = Object.keys(headers);
		}
		else if (this.props.isLogged === true && this.props.addMenu === true && this.state.updateMenu === false) {
			subMenu = <ModelForm addMenu = {this.props.addMenu} handleBack={this.handleBack}></ModelForm>
				
		}
		else if (this.props.isLogged === true && this.state.updateMenu === true) {
			subMenu = <ModelForm addMenu = {this.props.addMenu} updateItem = {this.state.itemToUpdate} handleBack={this.handleBack}></ModelForm>
		}
		else{
			console.log("loading error?");
		}
		if(resData && header){
			subMenu = 
				<Table responsive>
					<thead>
						<tr>
								{header.map((k, i) => <th key={i}>{k}</th>)}
						</tr>
					</thead>
					<tbody>
						{
							resData.map((r,i) => (
								<tr key={i}>{
									Object.values(r).map((resval, j) => <td key={j}>{(Object.keys(resval).length !==0) ? this.handleParam(resval) : resval}</td>)
									//Object.values(r).map((resval, j) => <td key={j}>{resval.toString()}</td>)
									}
									<td><Button variant="primary" key={i} onClick={() => this.handleUpdateMenu(r)}>Update</Button></td>
									<td><Button variant="secondary" key={i} onClick={() => this.handleDelete(r)}>Delete</Button></td>
								</tr>
							))
						}
					</tbody>
				</Table>
		}
		return (
			<div className="user-menu-container">
				{subMenu}
			</div>
		);
	}
}

export {SubMenu};