import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/index.css";
import App from "./containers/App";
import store from "./store";
import * as serviceWorker from "./serviceWorker";

const render = () => ReactDOM.render(<App />, document.getElementById("root"));

store.subscribe(render);
render();

serviceWorker.unregister();
