import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class TaskEdit extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			type: "",
			status: "",
			accountId: "",
			types: [],
			statuses: [],
			accounts: [],
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.getTaskStatuses = this.getTaskStatuses.bind(this);
		this.getTaskTypes = this.getTaskTypes.bind(this);
		this.getAccounts = this.getAccounts.bind(this);
	}
	
	componentDidMount(){
		this.getTaskStatuses();
		this.getTaskTypes();
		this.getAccounts();
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
		const backend_url = 'http://localhost:8081/task/'+this.state.accountId;
		let config = {
			headers: { 
				"Access-Control-Allow-Origin": "*",
				'Content-Type':'application/json',
			},
		};
		let params = {
				"title":this.state.title,
				"description": this.state.description,
				"type": this.state.type,
				"status" : this.state.status,
			}
		axios.post(backend_url, params, config)
			.then(response => {
				console.log(response.status);
			});
	}
	
	getTaskStatuses() {
		const backend_url = 'http://localhost:8081/task/statuses';
		axios.get(backend_url, {
			params: {
				
			}
		})
		.then((response) =>{
			if(response.status == '200'){
				this.setState({statuses: response.data}, () => this.setState({status: response.data[0]}));
			}
		}).catch((error) =>{
			console.log(error);
		})

	}
	
	getTaskTypes() {
		const backend_url = 'http://localhost:8081/task/types';
		axios.get(backend_url, {
			params: {
				
			}
		})
		.then((response) =>{
			if(response.status == '200'){
				this.setState({types: response.data},() => this.setState({type: response.data[0]}));
			}
		}).catch((error) =>{
			console.log(error);
		})
	}
	
	getAccounts() {
		const backend_url = 'http://localhost:8081/accounts';
		axios.get(backend_url, {
			params: {
				
			}
		})
		.then((response) =>{
			if(response.status == '200'){
				this.setState({accounts: response.data},() => this.setState({accountId: response.data[0].accountId}));
			}
		}).catch((error) =>{
			console.log(error);
		})
	}
	
	render() {
		let inputForm;
		
		if(this.state.types.length >0){
			inputForm = <Form>
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
							<Form.Control as="select" name="type" onChange={this.handleChange}>
							{this.state.types.map((type,i) =>
								<option key={i} value={type}>{type}</option>
							)}
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="formTaskStatus">
							<Form.Label>Status</Form.Label>
							<Form.Control as="select" name="status" onChange={this.handleChange}>
							{this.state.statuses.map((type,i) =>
								<option key={i} value={type}>{type}</option>
							)}
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="formTaskAccountId">
							<Form.Label>Assign to account:</Form.Label>
							<Form.Control as="select" name="accountId" onChange={this.handleChange}>
							{this.state.accounts.map((type,i) =>
								<option key={i} value={type.accountId}>{type.name+" "+type.lastName}</option>
							)}
							</Form.Control>
						</Form.Group>

						<Button variant="primary" type="submit" onClick={this.handleAdd} data-onclickparam={"projects"}>
							Add
						</Button>
					</Form>;
		}
		else{
			inputForm =  <CircularProgress />;
		}
		return (
			<div>
			{inputForm}
			</div>
		);
	}
}

export {TaskEdit};