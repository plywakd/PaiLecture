import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class AccountMenu extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			account_list: [],
			header: [],
		}
		
		this.handleParam = this.handleParam.bind(this);
		this.getAllAccounts = this.getAllAccounts.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}
	
	componentDidMount(){
		this.getAllAccounts();
	}
	
	getAllAccounts(){
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
									<td><Button variant="primary" key={i}>Update</Button></td>
									<td><Button variant="secondary" key={i} onClick={()=>this.handleDelete(r)}>Delete</Button></td>
								</tr>
							))
						}
					</tbody>
				</Table>;
		let display;
		this.state.account_list.length > 0 ? display = listing : display = <CircularProgress />;
		return (
			<div>
				{display}
			</div>
		);
	}
}

export {AccountMenu};