import React from 'react';
import Menu from '../containers/Menu';
import Records from '../containers/Records';
import Controls from '../containers/Controls';
import GameResult from '../containers/GameResult';
import '../stylesheets/Dialog.css';

const Dialog = ({ state, startGame }) => {
    const { isOver: show, dialogName: name, records, lastResult } = state;
    const Child = () => {
        switch(name) {
            case 'menu':
                return <Menu startGame={startGame} />;
            case 'records':
                return <Records records={records} />;
            case 'controls': 
                return <Controls />;
            case 'game-result':
                return (
									<GameResult lastResult={lastResult} 
															records={records} startGame={startGame} 
								/>);
            default:
                return null;
        }
    };

    return (
        <div className="dialog" style={{display: show ? 'block' : 'none'}}>
            <Child />
        </div>
    );
};

export default Dialog;