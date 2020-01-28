import React, { Component } from "react";
import Icon from "../components/Icon";
import store from "../store";
import { changeDialogName, changeUsername } from "../actions";
import "../stylesheets/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.username || ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.value.slice(0, 10);
    this.setState({ name });
  }

  handleSubmit(e) {
    e.preventDefault();
    const usernameUpdated = (this.props.username || "") === this.state.name;
    if (!usernameUpdated) {
      const name = this.state.name;
      store.dispatch(changeUsername(name));
      if (name) localStorage.setItem("username", name);
      else localStorage.removeItem("username");
    }
  }

  render() {
    const lang = document.documentElement.lang;
    const usernameUpdated = (this.props.username || "") === this.state.name;
    const header = { en: "Login", ru: "Изменить Ник" };
    const description = {
      add: {
        en: "To add your results to overall ones, enter an username",
        ru: "Чтобы добавить свои результаты к общим, введите ник"
      },
      change: {
        en: "You can change your username",
        ru: "Вы можете изменить свой ник"
      }
    };
    const warning = { en: "At most 10 characters", ru: "Не более 10 символов" };
    const buttonName = {
      add: { en: "Add", ru: "Добавить" },
      change: { en: "Change", ru: "Изменить" }
    };
    const message = { en: "All is up to date", ru: "Изменения сохранены" };

    return (
      <div className="login">
        <div className="header">
          <span
            onClick={() => store.dispatch(changeDialogName("menu"))}
            className="back-button"
          >
            <Icon type="back" color="rgba(119, 113, 113)" />
          </span>
          <span>{header[lang]}</span>
        </div>
        <div className="description">
          {this.props.username
            ? description.change[lang]
            : description.add[lang]}
        </div>
        <form>
          <input onChange={this.handleChange} value={this.state.name} />
          <div className="warning">{warning[lang]}</div>
          <button
            type="submit"
            onClick={this.handleSubmit}
            className={usernameUpdated ? "disabled" : ""}
          >
            {this.props.username
              ? buttonName.change[lang]
              : buttonName.add[lang]}
          </button>
        </form>
        {usernameUpdated && <div className="message">{message[lang]}</div>}
      </div>
    );
  }
}

export default Login;
