import React from 'react';
import Field from '../containers/Field';
import Info from '../containers/Info';
import '../stylesheets/App.css';

const App = () => {
  return (
    <div className="app">
      <Field />
      <Info />
    </div>
  );
}

export default App;
