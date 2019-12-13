import React from 'react';
import store from '../store';
import { changeDialogName } from '../actions';
import '../stylesheets/Menu.css';

const Menu = ({startGame}) => {
    return (
        <div className="menu">
            <button onClick={startGame}>Play</button>
            <button onClick={() => store.dispatch(changeDialogName('records'))}>Records</button>
            <button onClick={() => store.dispatch(changeDialogName('controls'))}>Controls</button>
        </div>
    );
};

export default Menu;