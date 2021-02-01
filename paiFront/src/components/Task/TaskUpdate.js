import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class TaskUpdate extends React.Component{
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
		this.handleUpdate = this.handleUpdate.bind(this);
	}
	
	componentDidMount(){
		console.log("TODO");
	}
	
	
	handleUpdate(event) {
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
				"type": this.state.type,
				"status" : this.state.status,
			}
		axios.put(backend_url, params, config)
			.then(response => {
				console.log(response.status);
				response.status == "200" ? alert("Added record to Database") : alert("Could not saved record to Database");
			});
	}
	
	
	render() {
		
		return (
			<div>
			</div>
		);
	}
}

export {TaskUpdate};