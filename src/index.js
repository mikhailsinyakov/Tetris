import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './components/App';
import store from './store';
import * as serviceWorker from './serviceWorker';

const render = () =>
  ReactDOM.render(<App />, document.getElementById('root'));

render();
store.subscribe(render);

serviceWorker.unregister();
