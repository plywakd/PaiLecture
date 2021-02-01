import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from 'react-bootstrap/Form'

class TaskMenu extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			task_list: [],
			header: [],
			type: "",
			status: "",
			name: "",
			types: [],
			statuses: [],
		}
		this.getAllTasks = this.getAllTasks.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleParam = this.handleParam.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
		this.getTaskStatuses = this.getTaskStatuses.bind(this);
		this.getTaskTypes = this.getTaskTypes.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	
	componentDidMount(){
		this.getAllTasks();
		this.getTaskStatuses();
		this.getTaskTypes();
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
		  [name]: value    
		});
	}
	
	handleParam = (toRecognize) => {
		if (typeof (toRecognize) === 'string') {
			return toRecognize
		}
		if (typeof (toRecognize) === 'object') {
			return toRecognize.name + " " + toRecognize.lastName;
        }
		return ""
    }
	
	getAllTasks(){
		const backend_url = 'http://localhost:8081/tasks';
		axios.get(backend_url, {
			params: {
				
			}
		})
		.then((response) =>{
			if(response.status == '200'){
				console.log(response.data);
				this.setState({task_list: response.data}, () =>{
					let headers = Object.values(this.state.task_list)[0];
					this.setState({header: Object.keys(headers)});
				});
			}
		}).catch((error) =>{
			console.log(error);
		})
	}
	
	handleDelete = (item) => {
		const backend_url = 'http://localhost:8081/account/delete';
		var config = {
			method: 'delete',
			url: backend_url,
			headers: { 
				"Access-Control-Allow-Origin": "*",
			},
			params: {
				"id":item.accountId,
			}
		};

		axios(config)
		.then(response => {
			console.log(response.status);
			this.getAllAccounts();
		});
	}
	
	handleFilter(event){
		event.preventDefault();
		let params = {}
		const backend_url = 'http://localhost:8081/task';
		params={
			name:this.state.name,
			status: this.state.status,
			type: this.state.type
		}
		console.log(params);
		axios.get(backend_url,{params:params})
		.then(response => {
			console.log(response.status);
			console.log(response.data);
			if(response.data.length > 0){
				this.setState({task_list:response.data});
			}
		})
		.catch(error=>{
			console.log(error);
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
				this.setState({statuses: response.data});
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
				this.setState({types: response.data});
			}
		}).catch((error) =>{
			console.log(error);
		})
	}
	
	render() {
		let filter_menu = <Form>
						<Form.Group controlId="formTaskTitle">
							<Form.Label>Find by title</Form.Label>
							<Form.Control type="text" name="name" onChange={this.handleChange} placeholder="Enter Title" />
						</Form.Group>
						
						<Form.Group controlId="formTaskType">
							<Form.Label>Find by type</Form.Label>
							<Form.Control as="select" name="type" onChange={this.handleChange}>
							<option key="0" value={""}></option>
							{this.state.types.map((type,i) =>
								<option key={i} value={type}>{type}</option>
							)}
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="formTaskStatus">
							<Form.Label>Find by status</Form.Label>
							<Form.Control as="select" name="status" onChange={this.handleChange}>
								<option key="0" value={""}></option>
							{this.state.statuses.map((type,i) =>
								<option key={i} value={type}>{type}</option>
							)}
							</Form.Control>
						</Form.Group>

						<Button variant="primary" type="submit" onClick={this.handleFilter}>
							Search
						</Button>
						<Button variant="primary" type="reset" onClick={this.getAllTasks}>
							Reset
						</Button>
					</Form>;
		let listing = <Table responsive>
					<thead>
						<tr>
								{this.state.header.map((k, i) => <th key={i}>{k}</th>)}
						</tr>
					</thead>
					<tbody>
						{
							this.state.task_list.map((r,i) => (
								<tr key={i}>{
									Object.values(r).map((resval, j) => <td key={j}>{(Object.keys(resval).length !==0) ? this.handleParam(resval) : resval.toString()}</td>)
									}
									<td><Button variant="secondary" key={i} onClick={()=>this.handleDelete(r)}>Delete</Button></td>
								</tr>
							))
						}
					</tbody>
				</Table>;
		let display;
		this.state.task_list.length > 0 ? display = listing : display = <CircularProgress />;
		return (
			<div>
				{filter_menu}
				{display}
			</div>
		);
	}
}

export {TaskMenu};