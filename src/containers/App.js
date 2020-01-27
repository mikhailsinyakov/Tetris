import React, { Component } from "react";
import Field from "../components/Field";
import Info from "./Info";
import Dialog from "../components/Dialog";
import Icon from '../components/Icon';
import "../stylesheets/App.css";
import GameProcess from "../lib/GameProcess";
import store from "../store";
import { changeDialogName, changeUsername } from "../actions";

const gameProcess = new GameProcess();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSituation: "not started"
    };
    this.togglePause = this.togglePause.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  togglePause() {
    if (this.state.gameSituation === "playing") gameProcess.pause();
    if (this.state.gameSituation === "paused") gameProcess.resume();
  }

  startGame() {
    gameProcess.start();
  }

  componentDidMount() {
    gameProcess.init();
    gameProcess.addListener(({ type }) => {
			if (type === "start") {
				store.dispatch(changeDialogName("none"));
			}
      if (type === "start" || type === "resume")
        this.setState({ gameSituation: "playing" });
      if (type === "pause") this.setState({ gameSituation: "paused" });
      if (type === "finish") {
        this.setState({ gameSituation: "not started" });
        store.dispatch(changeDialogName("game-result"));
      }
    });
    const username = localStorage.getItem("username");
    if (username) store.dispatch(changeUsername(username));
  }

  componentWillUnmount() {
    gameProcess.reset();
  }

  render() {
		const state = store.getState();
		const { gameSituation } = this.state;

    return (
      <div
        className="app"
        style={{
          backgroundColor: state.isOver
            ? "var(--dark-background-color)"
            : "var(--background-color)"
        }}
      >
        <div
          className="game"
          style={{ filter: state.isOver ? "brightness(0.7)" : "none" }}
        >
          <Field
            state={state}
            isPlaying={gameSituation === "playing"}
          />
          <Info
            gameSituation={gameSituation}
            togglePause={this.togglePause}
          />
					{gameSituation === 'paused' && 
						<span id="finish-button" onClick={() => gameProcess.finish()}>
							<Icon type="finish" color="#e82b2b" />
						</span>}
        </div>
        <Dialog state={state} startGame={this.startGame} />
      </div>
    );
  }
}

export default App;
