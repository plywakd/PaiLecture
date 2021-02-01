import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

class AccountEdit extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			accountName: "",
			accountLastName: "",
			email:"",
			password:"",
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}
	
	componentDidMount(){
		
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
		  [name]: value    
		});
	}
	
	handleAdd(event) {
		event.preventDefault();
		const backend_url = 'http://localhost:8081/account';
		let config = {
			headers: { 
				"Access-Control-Allow-Origin": "*",
				'Content-Type':'application/json',
			},
		};
		let params = {
				"name":this.state.accountName,
				"lastName": this.state.accountLastName,
				"email": this.state.email,
				"password" : this.state.password,
			};
		console.log(params);
		axios.post(backend_url, params, config)
			.then(response => {
				console.log(response.status);
				response.status == "200" ? alert("Added record to Database") : alert("Could not saved record to Database");
			});
	}
	
	render() {
		return (
			<div>
				<Form>
					<Form.Group controlId="formAccountName">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" name="accountName" onChange={this.handleChange} placeholder="Enter name" />
					</Form.Group>
					<Form.Group controlId="formAccountLastName">
						<Form.Label>Last name</Form.Label>
						<Form.Control type="text" name="accountLastName" onChange={this.handleChange} placeholder="Enter last name" />
					</Form.Group>
					<Form.Group controlId="formAccountEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" name="email" onChange={this.handleChange} placeholder="john@kowalsky.com" />
					</Form.Group>
					<Form.Group controlId="formAccountPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" name="password" onChange={this.handleChange} placeholder="Password" />
					</Form.Group>

					<Button variant="primary" type="submit" onClick={this.handleAdd} data-onclickparam={"projects"}>
						Add
					</Button>
				</Form>;
			</div>
		);
	}
}

export {AccountEdit};