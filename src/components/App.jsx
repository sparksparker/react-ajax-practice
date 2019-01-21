import React from 'react';
import $ from 'jquery';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			message: '',
			response: ''
		};
		this.handleName = this.handleName.bind(this);
		this.handleMessage = this.handleMessage.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleName(event) {
		this.setState({name: event.target.value});
	}

	handleMessage(event) {
		this.setState({message: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		var currentName = this.state.name;
		var currentMessage = this.state.message;
		var data = {
			name: currentName,
			message: currentMessage
		}
		$.ajax({
			url: 'http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf111/greeting',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: (data) => {
				this.setState({response: data});
				alert('Great job!!!!!!');
			},
			error: () => {
				console.log('thank you.. come again')
			}
		});
	}

	render() {
		return (
			<div>
				<div>
					<p>Server response: {this.state.response}</p>
				</div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name:
							<input type='text' value={this.state.name} onChange={this.handleName} />
						Message:
							<input type='text' value={this.state.message} onChange={this.handleMessage} />
					</label>
					<input type='submit' value='Submit' />
				</form>
			</div>
		);
	}
}

export default App