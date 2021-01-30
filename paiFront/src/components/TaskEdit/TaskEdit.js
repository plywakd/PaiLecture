import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

class TaskEdit extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			type: "",
			status:false,
			accountId:"",
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
		console.log(this.state.status);
		event.preventDefault();
		const backend_url = 'http://localhost:8081/task';
		let config = {
			headers: { 
				"Access-Control-Allow-Origin": "*",
				'Content-Type':'application/json',
			},
		};
		let params = {
				"title":this.state.title,
				"description": this.state.description,
				"type": this.state.email,
				"status" : this.state.status,
				"account" : this.state.accountId,
			}
		axios.post(backend_url, params, config)
			.then(response => {
				console.log(response.status);
			});
	}
	
	render() {
		return (
			<div>
				<Form>
					<Form.Group controlId="formTaskTitle">
						<Form.Label>Title</Form.Label>
						<Form.Control type="text" name="title" onChange={this.handleChange} placeholder="Enter Title" />
					</Form.Group>
					<Form.Group controlId="formTaskDesc">
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" name="description" onChange={this.handleChange} placeholder="Description" />
					</Form.Group>
					<Form.Group controlId="formTaskType">
						<Form.Label>Type</Form.Label>
						<Form.Control type="text" name="type" onChange={this.handleChange} placeholder="todo" />
					</Form.Group>
					<Form.Group controlId="formTaskStatus">
						<Form.Label>Status</Form.Label>
						<Form.Control type="text" name="status" onChange={this.handleChange} placeholder="todo" />
					</Form.Group>
					<Form.Group controlId="formTaskAccountId">
						<Form.Label>Assigned account ID</Form.Label>
						<Form.Control type="number" name="accountId" onChange={this.handleChange}/>
					</Form.Group>

					<Button variant="primary" type="submit" onClick={this.handleAdd} data-onclickparam={"projects"}>
						Add
					</Button>
				</Form>;
			</div>
		);
	}
}

export {TaskEdit};