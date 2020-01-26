import React from 'react';
import Icon from '../components/Icon';
import store from '../store';
import { changeDialogName } from '../actions';
import '../stylesheets/GameResult.css';

const GameResult = ({lastResult, records, startGame, username}) => {
	const personalPlace = records.personal.findIndex(record => record.points === lastResult) + 1;
	const overallPlace = records.overall.findIndex(record => 
		record.points === lastResult && record.username === username) + 1;
	
	const numWithEnding = num => {
		return num === 1 ? num + 'st' :
						num === 2 ? num + 'nd' :
						num === 3 ? num + 'rd' :
						num + 'th';
	}
	
	let congratulationMsg = '';
	if (overallPlace >= 1 && overallPlace <= 5) {
		if (overallPlace <= 3) congratulationMsg += 'Congratulations!\n';
		congratulationMsg += `You got ${numWithEnding(overallPlace)} result among all players`;
	} else if (personalPlace >= 1 && overallPlace <= 3) {
		if (personalPlace === 1) congratulationMsg += 'Congratulations!\n';
		congratulationMsg += `You got ${numWithEnding(personalPlace)} result`;
	}

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
					{ congratulationMsg ? <p>{congratulationMsg}</p> : '' }
					<p>Your score is {lastResult} points</p>
				</div>
				<button onClick={startGame}>Play again</button>
			</div>
		</div>
	);
};

export default GameResult;