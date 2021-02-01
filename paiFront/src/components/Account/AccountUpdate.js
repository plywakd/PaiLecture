import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import './account.css';

class AccountUpdate extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			lastName: "",
			email:"",
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
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
	
	handleUpdate=(id)=> {
		const backend_url = 'http://localhost:8081/account/'+id;
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
		axios.put(backend_url, params, config)
			.then(response => {
				console.log(response.status);
				response.status == "200" ? alert("Modified record to Database") : alert("Could not save record to Database");
			});
	}
	
	render() {
		let itemInfo = [];
		let itemToUpdate = [];
		for(const [key, val] of Object.entries(this.props.location.account)){
				itemInfo.push(<TextField disabled multiline id={key} label={key} defaultValue={val.toString()}/>);
				if(typeof val !== 'object' && val !== null && key!='accountId')itemToUpdate.push(<TextField multiline id={key} label={key} name={key}defaultValue={val.toString()} onChange={this.handleChange}/>)
			}
		return (
			<div className="form_flex">
				<div className="form-container">
					<h3>Account you are modyfing</h3>
					{itemInfo}
				</div>
				<div className="form-container">
					<h3>Input new values</h3>
					{itemToUpdate}
					<Button id="update" onClick={()=> this.handleUpdate(this.props.location.account.accountId)} >Update</Button>
				</div>
			</div>
		);
	}
}

export {AccountUpdate};