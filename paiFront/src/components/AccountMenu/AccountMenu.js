import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from "react-router-dom";
import Form from 'react-bootstrap/Form'

class AccountMenu extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			account_list: [],
			header: [],
			accountId: "",
			email:"",
			status: null,
		}
		
		this.handleParam = this.handleParam.bind(this);
		this.getAllAccounts = this.getAllAccounts.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleActivate=this.handleActivate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
	}
	
	componentDidMount(){
		this.getAllAccounts();
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
		  [name]: value    
		});
	}
	
	getAllAccounts(){
		this.setState({accountId:""});
		this.setState({email:""});
		this.setState({status:null});
		const backend_url = 'http://localhost:8081/accounts';
		axios.get(backend_url)
		.then((response) =>{
			if(response.status == '200'){
				console.log(response.data);
				this.setState({account_list: response.data}, () =>{
					let headers = Object.values(this.state.account_list)[0];
					this.setState({header: Object.keys(headers)});
				});
			}
		}).catch((error) =>{
			console.log(error);
		})
	}
	
	handleParam = (toRecognize) => {
		if (typeof (toRecognize) === 'string') {
			return toRecognize
		}
		if (typeof (toRecognize) === 'object') {
			let tasks=[];
			toRecognize.forEach(task => {
				tasks.push(task.title);
				tasks.push(<br />);
			});
			return tasks;
        }
		return ""
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
		})
		.catch(error=>{
			console.log(error);
		});
	}
	
	handleActivate(accountId) {
		const backend_url = 'http://localhost:8081/account/status/id='+accountId;
		let config = {
			headers: { 
				"Access-Control-Allow-Origin": "*",
				'Content-Type':'application/json',
			},
		};
		axios.put(backend_url, {}, config)
			.then(response => {
				console.log(response.status);
				response.status == "200" ? this.getAllAccounts() : alert("Could not update record to Database");
			});
	}
	
	handleFilter(event){
		event.preventDefault();
		let params = {}
		let backend_url;
		if(this.state.status !== null){
			backend_url = 'http://localhost:8081/account/status';
			params={
				status:this.state.status
			}
		}
		else{
			backend_url = 'http://localhost:8081/account';
			params = {
				accountId:this.state.accountId,
				email:this.state.email
			}
		}
		console.log(params);
		axios.get(backend_url,{params:params})
		.then(response => {
			console.log(response.status);
			console.log(response.data);
			if(response.data.length > 0){
				this.setState({account_list:response.data});
			}
		})
		.catch(error=>{
			console.log(error);
		});
	}
	
	render() {
		let listing = <Table responsive>
					<thead>
						<tr>
								{this.state.header.map((k, i) => <th key={i}>{k}</th>)}
						</tr>
					</thead>
					<tbody>
						{
							this.state.account_list.map((r,i) => (
								<tr key={i}>{
									Object.values(r).map((resval, j) => <td key={j}>{(Object.keys(resval).length !==0) ? this.handleParam(resval) : resval.toString()}</td>)
									}
									{r.status == false ? <td><Button variant="primary" key={i} onClick={()=>this.handleActivate(r.accountId)}>Activate</Button></td> : <td><Button variant="warning" key={i} onClick={()=>this.handleActivate(r.accountId)}>Deactivate</Button></td>}
									<td><Button variant="danger" key={i} onClick={()=>this.handleDelete(r)}>Delete</Button></td>
								</tr>
							))
						}
					</tbody>
				</Table>;
		let display;
		this.state.account_list.length > 0 ? display = listing : display = <CircularProgress />;
		let filter_menu = <Form>
						<Form.Group controlId="formAccountId">
							<Form.Label>Find by account id</Form.Label>
							<Form.Control type="number" name="accountId" onChange={this.handleChange} />
						</Form.Group>
						<Form.Group controlId="formAccountEmail">
							<Form.Label>Find by Email</Form.Label>
							<Form.Control type="email" name="email" onChange={this.handleChange} placeholder="john@kowalsky.com" />
						</Form.Group>
						<Form.Group controlId="formAccountStatus">
							<Form.Label>Select by status</Form.Label>
							<Form.Control as="select" name="status" onChange={this.handleChange}>
							<option key="t" value={true}>active</option>
							<option key="f" value={false}>deactivated</option>
							</Form.Control>
						</Form.Group>
						<Button variant="primary" type="submit" onClick={this.handleFilter}>
							Search
						</Button>
						<Button variant="primary" type="reset" onClick={this.getAllAccounts}>
							Reset
						</Button>
						</Form>
		return (
			<div>
				{filter_menu}
				{display}
			</div>
		);
	}
}

export {AccountMenu};