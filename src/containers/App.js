import React, { Component } from "react";
import Field from "../components/Field";
import Info from "./Info";
import Dialog from "../components/Dialog";
import Footer from "../components/Footer";
import Icon from "../components/Icon";
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
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  togglePause() {
    if (this.state.gameSituation === "playing") gameProcess.pause();
    if (this.state.gameSituation === "paused") gameProcess.resume();
  }

  startGame() {
    gameProcess.start();
  }

  initGameProcess() {
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
  }

  getUpdateUsername() {
    const username = localStorage.getItem("username");
    if (username) store.dispatch(changeUsername(username));
  }

  defineSetLanguage() {
    let language = localStorage.getItem("language");
    if (!language) {
      const langs = window.navigator.language;
      if (langs) {
        const lang = langs.split(";")[0];
        if (/[rR]u/.test(lang)) language = "ru";
        else language = "en";
      } else language = "en";
    }
    document.documentElement.lang = language;
  }

  changeLanguage(language) {
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
    this.forceUpdate();
  }

  componentDidMount() {
    this.initGameProcess();
    this.getUpdateUsername();
    this.defineSetLanguage();
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
          <Field state={state} isPlaying={gameSituation === "playing"} />
          <Info gameSituation={gameSituation} togglePause={this.togglePause} />
          {gameSituation === "paused" && (
            <span id="finish-button" onClick={() => gameProcess.finish()}>
              <Icon type="finish" color="#e82b2b" />
            </span>
          )}
        </div>
        <Dialog state={state} startGame={this.startGame} />
        {gameSituation === "not started" && (
          <Footer changeLanguage={this.changeLanguage} />
        )}
      </div>
    );
  }
}

export default App;
