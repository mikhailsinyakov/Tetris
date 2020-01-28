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

  addEnding(num) {
    const wordRoot = "очк";
    const numStr = num.toString();
    const lastDigit = numStr[numStr.length - 1];
    const digitBeforeLast = numStr[numStr.length - 2];
    let ending;
    if (lastDigit === "1") {
      if (digitBeforeLast === "1") ending = "ов";
      else ending = "о";
    } else if (lastDigit === "2" || lastDigit === "3" || lastDigit === "4") {
      if (digitBeforeLast === "1") ending = "ов";
      else ending = "а";
    } else ending = "ов";

    return `${num} ${wordRoot}${ending}`;
  }

  render() {
    const lang = document.documentElement.lang;
    const noRecordsMsg = {
      en: "There are no records yet",
      ru: "Еще нет рекордов"
    };
    const records = this.props.records[this.state.part]
      .filter((_, i) => i < 10)
      .map((record, i) => (
        <p key={i}>
          <span className="place">{i + 1}.</span>
          {record.username && (
            <span className="username">{record.username.slice(0, 10)}</span>
          )}
          <span className="points">
            {lang === "en"
              ? `${record.points} points`
              : this.addEnding(record.points)}
          </span>
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
            {lang === "en" ? "Personal" : "Личные"}
          </button>
          <button
            onClick={() => this.changePart("overall")}
            className={
              "choose-part-button " +
              (this.state.part === "overall" ? "active" : "")
            }
          >
            {lang === "en" ? "Overall" : "Общие"}
          </button>
        </div>
        <div className="data">
          {records.length ? records : <p>{noRecordsMsg}</p>}
        </div>
      </div>
    );
  }
}

export default Records;
