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
			gameSituation: 'not started',
      pointerType: null
		};
		this.togglePause = this.togglePause.bind(this);
		this.startGame = this.startGame.bind(this);
  }

  definePointerType() {
    return new Promise(resolve => {
      document.body.addEventListener('mousemove', function setPointerType() {
        resolve('mouse');
        document.body.removeEventListener('mousemove', setPointerType);
      });
      document.body.addEventListener('touchstart', function setPointerType() {
        resolve('touchscreen');
        document.body.removeEventListener('touchstart', setPointerType);
      });
    });
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
    this.definePointerType().then(type => this.setState({pointerType: type}));
	}
	
	componentWillUnmount() {
		gameProcess.reset();
	}

  render() {
    const state = store.getState();

    return (
      <div className="app">
        <Field state={state} isPlaying={this.state.gameSituation === 'playing'}/>
        <Info gameSituation={this.state.gameSituation} togglePause={this.togglePause}/>
        <Dialog state={state} startGame={this.startGame} pointerType={this.state.pointerType} />
      </div>
    );
  }
}

export default App;
