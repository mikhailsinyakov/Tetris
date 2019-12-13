import React from 'react';
import Shape from '../components/Shape';
import '../stylesheets/Info.css';
import store from '../store';

const Info = ({gameSituation, togglePause}) => {
	const { nextShape, info } = store.getState();
	let buttonName;
	if (gameSituation === 'paused' || gameSituation === 'not started') buttonName = 'PLAY';
	else if (gameSituation === 'playing') buttonName = 'PAUSE';

  return (
    <div className="info">
      <button id="toggle-playing" onClick={togglePause} >
        {buttonName}
      </button>
      <span><b>NEXT SHAPE:</b></span>
      <Shape nextShape={nextShape} />
      <span><b>SCORE:</b>{Math.floor(info.score)}</span>
      <span><b>LEVEL:</b>{info.level}</span>
      <span><b>LINES:</b>{info.lines}</span>
    </div>
  );
};

export default Info;
