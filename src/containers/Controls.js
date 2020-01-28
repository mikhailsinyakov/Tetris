import React, { Component } from "react";
import Icon from "../components/Icon";
import store from "../store";
import { changeDialogName } from "../actions";
import "../stylesheets/Controls.css";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "keyboard"
    };
    this.instructions = {
      keyboard: [
        {
          iconType: "moveLeft",
          action: { en: "press a ← key", ru: "клавиша ←" }
        },
        {
          iconType: "moveRight",
          action: { en: "press a → key", ru: "клавиша →" }
        },
        {
          iconType: "rotate",
          action: { en: "press a ↑ key", ru: "клавиша ↑" }
        },
        {
          iconType: "speedUp",
          action: { en: "press a ↓ key", ru: "клавиша ↓" }
        },
        {
          iconTypes: ["pause", "play"],
          action: { en: 'press a "Space" key', ru: "клавиша пробел" }
        }
      ],
      mouse: [
        {
          iconType: "move",
          action: {
            en: "move the mouse within the field",
            ru: "проведите мышью внутри игрового поля"
          }
        },
        {
          iconType: "rotate",
          action: { en: "turn the mouse wheel", ru: "поверните колесико мыши" }
        },
        {
          iconType: "speedUp",
          action: { en: "right click", ru: "правая кнопка мыши" }
        },
        {
          iconType: "moveToBottom",
          action: { en: "left click", ru: "левая кнопка мыши" }
        }
      ],
      touchscreen: [
        {
          iconType: "moveLeft",
          action: { en: "swipe left", ru: "свайп влево" }
        },
        {
          iconType: "moveRight",
          action: { en: "swipe right", ru: "свайп вправо" }
        },
        {
          iconType: "rotate",
          action: { en: "tap the screen", ru: "коснитесь экрана" }
        },
        {
          iconType: "speedUp",
          action: { en: "swipe down", ru: "свайп вниз" }
        },
        {
          iconType: "moveToBottom",
          action: {
            en: "swipe down, ending below the field",
            ru: "свайп вниз ниже поля"
          }
        }
      ]
    };
    this.switchTab = this.switchTab.bind(this);
  }

  switchTab(tab) {
    this.setState({ tab });
  }

  render() {
    const { tab } = this.state;
    const tabNames = [
      { en: "keyboard", ru: "клавиатура" },
      { en: "mouse", ru: "мышь" },
      { en: "touchscreen", ru: "экран" }
    ];
    const instructions = this.instructions[tab];
    const lang = document.documentElement.lang;

    return (
      <div className="controls component">
        <div className="buttons">
          <span
            onClick={() => store.dispatch(changeDialogName("menu"))}
            className="back-button"
          >
            <Icon type="back" color="rgba(119, 113, 113)" />
          </span>
          {tabNames.map(tabName => (
            <button
              className={
                "choose-tab-button " + (tab === tabName.en ? "active" : "")
              }
              key={tabName.en}
              onClick={() => this.switchTab(tabName.en)}
            >
              {tabName[lang][0].toUpperCase() + tabName[lang].slice(1)}
            </button>
          ))}
        </div>
        <div className="instructions">
          {instructions.map(({ iconType = "", iconTypes, action }) => (
            <div key={iconType} className="instruction-item">
              <div className="icons-container">
                {iconType ? (
                  <Icon type={iconType} color="black" />
                ) : (
                  iconTypes.map(type => (
                    <Icon key={type} type={type} color="black" />
                  ))
                )}
              </div>
              <div className="action">
                {action[lang][0].toUpperCase() + action[lang].slice(1)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Controls;
