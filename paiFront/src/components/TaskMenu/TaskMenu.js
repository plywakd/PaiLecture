import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class TaskMenu extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			task_list: [],
			header: [],
		}
		this.getAllTasks = this.getAllTasks.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}
	
	componentDidMount(){
		this.getAllTasks();
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
	
	
	render() {
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
									Object.values(r).map((resval, j) => <td key={j}>{resval.toString()}</td>)
									}
									<td><Button variant="primary" key={i}>Update</Button></td>
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
				{display}
			</div>
		);
	}
}

export {TaskMenu};