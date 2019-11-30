import React from 'react';
import store from '../store';
import { changeDialogName, startGame, updateShapeShadow } from '../actions';
import '../stylesheets/Menu.css';

const Menu = () => {
    const startNewGame = () => {
        store.dispatch(startGame());
        const { activeShape, filledCells } = store.getState();
        store.dispatch(updateShapeShadow(activeShape, filledCells));
    };

    return (
        <div className="menu">
            <button onClick={startNewGame}>Play</button>
            <button onClick={() => store.dispatch(changeDialogName('records'))}>Records</button>
            <button onClick={() => store.dispatch(changeDialogName('controls'))}>Controls</button>
        </div>
    );
};

export default Menu;