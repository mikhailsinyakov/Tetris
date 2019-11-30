import React from 'react';
import store from '../store';
import { changeDialogName, startGame, updateShapeShadow } from '../actions';
import '../stylesheets/GameResult.css';

const GameResult = ({lastResult, records}) => {
    const personalPlace = records.personal.findIndex(record => record.points === lastResult) + 1;
    const startNewGame = () => {
        store.dispatch(startGame());
        const { activeShape, filledCells } = store.getState();
        store.dispatch(updateShapeShadow(activeShape, filledCells));
    };

    return (
        <div className="game-result">
            <button 
                onClick={() => store.dispatch(changeDialogName('menu'))} 
                className="back-button">
                    ←
            </button>
            <p>Your score is {lastResult} points</p>
            { personalPlace === 1 ? 
                <p>Congratulations! It's your best result!</p> :
                personalPlace <= 10 ? 
                    <p>It's your 
                        {' ' + personalPlace + 
                            (personalPlace === 2 ? 'nd' : 
                            personalPlace === 3 ? 'rd' : 
                            'th') + ' '} 
                        result</p> :
                    ''
            }
            <button onClick={startNewGame}>Play again</button>
        </div>
    );
};

export default GameResult;