import React from 'react';
import Menu from '../containers/Menu';
import Login from '../containers/Login';
import Records from '../containers/Records';
import Controls from '../containers/Controls';
import GameResult from '../containers/GameResult';
import '../stylesheets/Dialog.css';

const Dialog = ({ state, startGame }) => {
    const { isOver: show, dialogName: name, records, lastResult, username } = state;
    const Child = () => {
        switch(name) {
            case 'menu':
								return <Menu startGame={startGame} />;
						case 'login':
								return <Login username={username} />
            case 'records':
                return <Records records={records} />;
            case 'controls': 
                return <Controls />;
            case 'game-result':
                return (
									<GameResult lastResult={lastResult} username={username}
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