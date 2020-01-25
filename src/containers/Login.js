import React, {Component} from 'react';
import Icon from '../components/Icon';
import store from '../store';
import { changeDialogName, changeUsername } from '../actions';
import '../stylesheets/Login.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.username || ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const name = e.target.value.slice(0, 15);
		this.setState({name});
	}

	handleSubmit(e) {
		e.preventDefault();
		const usernameUpdated = (this.props.username || '') === this.state.name;
		if (!usernameUpdated) {
			const name = this.state.name || null;
			store.dispatch(changeUsername(name));
		}
	}

	render() {
		const usernameUpdated = (this.props.username || '') === this.state.name;
		return (
			<div className="login">
				<div className="header">
					<span 
						onClick={() => store.dispatch(changeDialogName('menu'))} 
						className="back-button"
					>
						<Icon type="back" color="rgba(119, 113, 113)" />
					</span>
					<span>Login</span>
				</div>
				<div className="description">
					{this.props.username ? 
						'To change your username, enter a new username'	:
						'To add your results to overall ones, enter an username'
					}
				</div>
				<form>
					<input onChange={this.handleChange} value={this.state.name}/>
					<div className="warning">At most 15 characters </div>
					<button type="submit" onClick={this.handleSubmit} 
						className={usernameUpdated ? 'disabled' : ''}>
							{this.props.username ? 'Change' : 'Add'}
					</button>
				</form>
				{
					usernameUpdated && <div className="message">All is up to date</div>
				}
			</div>
		)
	}
}

export default Login;