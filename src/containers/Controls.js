import React from 'react';
import store from '../store';
import { changeDialogName } from '../actions';
import '../stylesheets/Controls.css';

const Controls = ({pointerType}) => {
    return (
        <div className="controls">
            <button 
                onClick={() => store.dispatch(changeDialogName('menu'))} 
                className="back-button">
                    ←
            </button>
            <p>To move shape, {pointerType === 'mouse' ? 'press ← or →' : 'swipe left or right'}</p>
            <p>To speed up, {pointerType === 'mouse' ? 'press ↓' : 'swipe down'}</p>
            <p>To rotate shape, {pointerType === 'mouse' ? 'press ↑' : 'touch the screen'}</p>
            {pointerType === 'mouse' ? <p>To pause/resume game, press Space</p> : ''}
        </div>
    );
};

export default Controls;