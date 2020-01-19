import React from 'react';
import Icon from '../components/Icon';
import store from '../store';
import { changeDialogName } from '../actions';
import '../stylesheets/GameResult.css';

const GameResult = ({lastResult, records, startGame}) => {
    const personalPlace = records.personal.findIndex(record => record.points === lastResult) + 1;

    return (
        <div className="game-result">
					<div className="header">
						<span 
							onClick={() => store.dispatch(changeDialogName('menu'))} 
							className="back-button"
						>
							<Icon type="back" color="rgba(119, 113, 113)" />
						</span>
						<span>Game Over</span>
					</div>
					<div className="data">
						<div className="result">
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
							<p>Your score is {lastResult} points</p>
						</div>
            <button onClick={startGame}>Play again</button>
					</div>
        </div>
    );
};

export default GameResult;