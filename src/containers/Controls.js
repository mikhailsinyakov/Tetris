import React, {Component} from 'react';
import Icon from '../components/Icon';
import store from '../store';
import { changeDialogName } from '../actions';
import '../stylesheets/Controls.css';

class Controls extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 'keyboard'
		};
		this.instructions = {
			keyboard: [
				{iconType: 'moveLeft', action: 'press a ← key'},
				{iconType: 'moveRight', action: 'press a → key'},
				{iconType: 'rotate', action: 'press a ↑ key'},
				{iconType: 'speedUp', action: 'press a ↓ key'},
				{iconTypes: ['pause', 'play'], action: 'press a "Space" key'}
			],
			mouse: [
				{iconType: 'move', action: 'move the mouse within the field'},
				{iconType: 'rotate', action: 'turn the mouse wheel'},
				{iconType: 'speedUp', action: 'right click'},
				{iconType: 'moveToBottom', action: 'left click'}
			],
			touchscreen: [
				{iconType: 'moveLeft', action: 'swipe left'},
				{iconType: 'moveRight', action: 'swipe right'},
				{iconType: 'rotate', action: 'tap the screen'},
				{iconType: 'speedUp', action: 'swipe down'},
				{iconType: 'moveToBottom', action: 'swipe down, ending below the field'}
			]
		};
		this.switchTab = this.switchTab.bind(this);
	}

	switchTab(tab) {
		this.setState({tab});
	}

	render() {
		const { tab } = this.state;
		const tabNames = ['keyboard', 'mouse', 'touchscreen'];
		const instructions = this.instructions[tab];

		return (
			<div className="controls">
				
				<div className="buttons">
					<span 
						onClick={() => store.dispatch(changeDialogName('menu'))} 
						className="back-button"
					>
						<Icon type="back" color="rgba(119, 113, 113)" />
					</span>
					{tabNames.map(tabName => 
						<button 
							className={'choose-tab-button ' + (tab === tabName ? 'active' : '')} key={tabName}
							onClick={() => this.switchTab(tabName)}
						>
							{tabName[0].toUpperCase() + tabName.slice(1)}
						</button>
					)}
				</div>
				<div className="instructions">
					{
						instructions.map(({iconType = '', iconTypes, action}) => (
							<div key={iconType} className="instruction-item">
								<div className="icons-container">
									{iconType ? 
										<Icon type={iconType} color="black"/> :
										iconTypes.map(type => <Icon key={type} type={type} color="black"/>)}
								</div>
								<div className="action">{action[0].toUpperCase() + action.slice(1)}</div>
							</div>
						))
					}
				</div>
			</div>
		)
	}

}

export default Controls;