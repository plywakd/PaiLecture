import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './SubMenu.css';
import TextField from '@material-ui/core/TextField';

class ModelForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			projectName: "",
			studentName: "",
			taskName: "",
			projectDescription: "",
			taskDescription: "",
			returnDate: "",
			surname: "",
			indexNum: "",
			email:"",
			landline: false,
			projectId: "",
			runOrder: "",
		}
		this.handleAddOrUpdate = this.handleAddOrUpdate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleParam=this.handleParam.bind(this);
	}

	componentDidMount() {
		console.log("ModelForm component");
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
			if('taskId' in this.props.updateItem){
				return toRecognize.name
			}
			else if('projectId' in this.props.updateItem){
				let tasks =[];
				toRecognize.forEach(task => {
					tasks.push(task.name);
					tasks.push("\n");
				});
				return tasks;
			}
        }
		
		return ""
    }
	
	handleAddOrUpdate(event){
		event.preventDefault();
		let model = event.target.dataset.onclickparam;
		let params;
		if (model === "projects"){
			params = {
				"name":this.state.projectName,
				"description": this.state.projectDescription,
				"returnDate" : this.state.returnDate,
			}
		}
		else if(model === "students"){
			params = {
				"name":this.state.studentName,
				"surname": this.state.surname,
				"indexNum": this.state.indexNum,
				"email": this.state.email,
				"landline" : this.state.landline,
			}
		}
		else if(model === "tasks"){
			this.props.addMenu === true ? model = model + "/" + this.state.projectId: model=model;
			params = {
				"name":this.state.taskName,
				"projectId": this.state.projectId,
				"taskOrder": this.state.runOrder,
				"description" : this.state.taskDescription,
			}
		}
		var config = {
			headers: { 
				"Access-Control-Allow-Origin": "*",
				'Authorization': 'Basic YWRtaW46YWRtaW4=',
				'Content-Type':'application/json',

			},
		};
		if(this.props.addMenu === true){
			const backend_url = 'http://localhost:8081/api/'+model;
			axios.post(backend_url, params, config)
			.then(response => {
				console.log(response.status);
			});
		}
		else if(this.props.addMenu === false){
			let modelKey = model.slice(0,-1)+"Id";
			let modelId = this.props.updateItem[modelKey];
			const backend_url = 'http://localhost:8081/api/'+model+"/"+modelId;
			axios.put(backend_url, params, config)
			.then(response => {
				console.log(response.status);
			});
		}
		
	}

	
	render() {
		let preparedForm;
		let updatedItemInfo;
		let backButton;
		let projectForm = <Form>
					<Form.Group controlId="formProjectName">
						<Form.Label>Project name</Form.Label>
						<Form.Control type="text" name="projectName" onChange={this.handleChange} placeholder="Enter project name" />
					</Form.Group>
					<Form.Group controlId="formProjectDesc">
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" name="projectDescription" onChange={this.handleChange} placeholder="Description" />
					</Form.Group>
					<Form.Group controlId="formProjectDate">
						<Form.Label>Return date</Form.Label>
						<Form.Control type="date" name="returnDate" onChange={this.handleChange} />
					</Form.Group>

					<Button variant="primary" type="submit" onClick={this.handleAddOrUpdate} data-onclickparam={"projects"}>
						Add
					</Button>
				</Form>;
		let studentForm = <Form>
					<Form.Group controlId="formStudentName">
						<Form.Label>Student name</Form.Label>
						<Form.Control type="text" name="studentName" onChange={this.handleChange} placeholder="John" />
					</Form.Group>
					<Form.Group controlId="formStudentSurname">
						<Form.Label>Student surname</Form.Label>
						<Form.Control type="text" name="surname" onChange={this.handleChange} placeholder="Kowalsky" />
					</Form.Group>
					<Form.Group controlId="formStudentIndex">
						<Form.Label>Index number:</Form.Label>
						<Form.Control type="number" name="indexNum" onChange={this.handleChange} placeholder="123456" />
					</Form.Group>
					<Form.Group controlId="formStudentEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" name="email" onChange={this.handleChange} placeholder="john@kowalsky.com" />
					</Form.Group>
					<Form.Group controlId="formStudentLandline">
						<Form.Label>Landline</Form.Label>
						<Form.Control type="checkbox" name="landline" onChange={this.handleChange}/>
					</Form.Group>

					<Button variant="primary" type="submit" onClick={this.handleAddOrUpdate} data-onclickparam={"students"}>
						Add
					</Button>
				</Form>;
		let taskForm = <Form>
					<Form.Group controlId="formTaskName">
						<Form.Label>Task name</Form.Label>
						<Form.Control type="text" name="taskName" onChange={this.handleChange} placeholder="Enter task name" />
					</Form.Group>
					<Form.Group controlId="formTaskProject">	
						<Form.Label>Assign project id</Form.Label>
						<Form.Control type="number" name="projectId" onChange={this.handleChange}/>
					</Form.Group>
					<Form.Group controlId="formTaskOrder">	
						<Form.Label>Run order</Form.Label>
						<Form.Control type="number" name="runOrder" onChange={this.handleChange}/>
					</Form.Group>
					<Form.Group controlId="formTaskDesc">	
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" name="taskDescription" onChange={this.handleChange} placeholder="Description" />
					</Form.Group>

					<Button variant="primary" type="submit" onClick={this.handleAddOrUpdate} data-onclickparam={"tasks"}>
						Add
					</Button>
				</Form>;
		if(this.props.addMenu === true){
			preparedForm = [projectForm,studentForm,taskForm];
		}
		else{
			backButton = (<Button variant="primary" key="back" onClick={this.props.handleBack}>Back to menu</Button>);
			updatedItemInfo=[];
			preparedForm=[];
			for(const [key, val] of Object.entries(this.props.updateItem)){
				updatedItemInfo.push(<TextField disabled multiline id={key} label={key} defaultValue={this.handleParam(val)} className="btn-container" />)
			}
			if('studentId' in this.props.updateItem){
				preparedForm.push(studentForm);
			}
			else if('taskId' in this.props.updateItem){
				preparedForm.push(taskForm);
			}
			else if('projectId' in this.props.updateItem){
				preparedForm.push(projectForm);
			}
		}
		return (
			<div className="form_flex">
				<div className="btn-container">
					{updatedItemInfo}
					{backButton}
				</div>
				{preparedForm}
			</div>
		);
	}
	
}
export {ModelForm};