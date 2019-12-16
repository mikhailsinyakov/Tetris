import React, {Component} from 'react';
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
			keyboard: {
				'move shape': 'press ← or →',
				'rotate shape': 'press ↑',
				'speed up': 'press ↓',
				'pause/resume game': 'press "Space"'
			},
			mouse: {
				'move shape': 'move the mouse within the field',
				'rotate shape': 'turn the mouse wheel',
				'speed up': 'right click',
				'move shape to bottom': 'left click'
			},
			touchscreen: {
				'move shape': 'swipe left or right',
				'rotate shape': 'tap the screen',
				'speed up': 'swipe down',
				'move shape to bottom': 'swipe down, ending below the field'
			}
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
				<button 
					onClick={() => store.dispatch(changeDialogName('menu'))} 
					className="back-button">
						←
        </button>
				<div className="tabs">
					{tabNames.map(tabName => 
						<button 
							className={tab === tabName ? 'active' : ''} key={tabName}
							onClick={() => this.switchTab(tabName)}
						>
							{tabName[0].toUpperCase() + tabName.slice(1)}
						</button>
					)}
				</div>
				{
					Object.entries(instructions).map(([result, action]) => 
						<p key={result}>To {result}, {action}</p>)
				}
			</div>
		)
	}

}

export default Controls;