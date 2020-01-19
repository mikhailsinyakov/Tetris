import React, { Component } from 'react';
import Field from '../components/Field';
import Info from './Info';
import Dialog from '../components/Dialog';
import '../stylesheets/App.css';
import GameProcess from '../lib/GameProcess';
import store from '../store';
import { changeDialogName } from '../actions';

const gameProcess = new GameProcess();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
			gameSituation: 'not started'
		};
		this.togglePause = this.togglePause.bind(this);
		this.startGame = this.startGame.bind(this);
  }
	
	togglePause() {
		if (this.state.gameSituation === 'playing') gameProcess.pause();
		if (this.state.gameSituation === 'paused') gameProcess.resume();
	}

	startGame() {
		gameProcess.start();
	}

  componentDidMount() {
		gameProcess.init();
		gameProcess.addListener(({type}) => {
			if (type === 'start' || type === 'resume') this.setState({gameSituation: 'playing'});
			if (type === 'pause') this.setState({gameSituation: 'paused'});
			if (type === 'finish') {
				this.setState({gameSituation: 'not started'});
        store.dispatch(changeDialogName('game-result'))
			}
		});
	}
	
	componentWillUnmount() {
		gameProcess.reset();
	}

  render() {
    const state = store.getState();

    return (
      <div className="app">
				<div className="game">
					<Field state={state} isPlaying={this.state.gameSituation === 'playing'}/>
					<Info gameSituation={this.state.gameSituation} togglePause={this.togglePause}/>
				</div>
        <Dialog state={state} startGame={this.startGame} />
      </div>
    );
  }
}

export default App;
