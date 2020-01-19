import React from 'react';
import Indicator from '../components/Indicator';
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
			<Indicator name="next" component={<Shape nextShape={nextShape}/>}/>
			<Indicator name="score" value={Math.floor(info.score)}/>
    </div>
  );
};

export default Info;
