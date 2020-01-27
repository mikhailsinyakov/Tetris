import React, { Component } from "react";
import Icon from "../components/Icon";
import store from "../store";
import { changeDialogName } from "../actions";
import "../stylesheets/Records.css";

class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      part: "personal"
    };
    this.changePart = this.changePart.bind(this);
  }

  changePart(part) {
    if (this.state.part !== part) this.setState({ part });
  }

  render() {
    const records = this.props.records[this.state.part]
      .filter((_, i) => i < 10)
      .map((record, i) => (
        <p key={i}>
          <span className="place">{i + 1}.</span>
          {record.username && (
            <span className="username">{record.username.slice(0, 10)}</span>
          )}
          <span className="points">{record.points} points</span>
        </p>
      ));

    return (
      <div className="records">
        <div className="buttons">
          <span
            onClick={() => store.dispatch(changeDialogName("menu"))}
            className="back-button"
          >
            <Icon type="back" color="rgba(119, 113, 113)" />
          </span>
          <button
            onClick={() => this.changePart("personal")}
            className={
              "choose-part-button " +
              (this.state.part === "personal" ? "active" : "")
            }
          >
            Personal
          </button>
          <button
            onClick={() => this.changePart("overall")}
            className={
              "choose-part-button " +
              (this.state.part === "overall" ? "active" : "")
            }
          >
            Overall
          </button>
        </div>
        <div className="data">
          {records.length ? records : <p>There are no records yet</p>}
        </div>
      </div>
    );
  }
}

export default Records;
