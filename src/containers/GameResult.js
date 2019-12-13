import React from 'react';
import store from '../store';
import { changeDialogName } from '../actions';
import '../stylesheets/GameResult.css';

const GameResult = ({lastResult, records, startGame}) => {
    const personalPlace = records.personal.findIndex(record => record.points === lastResult) + 1;

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
            <button onClick={startGame}>Play again</button>
        </div>
    );
};

export default GameResult;