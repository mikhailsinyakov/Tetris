import React from 'react';
import Shape from '../components/Shape';
import '../stylesheets/Info.css';
import store from '../store';
import { startGame, pauseGame, resumeGame } from '../actions';

const Info = () => {
  const { nextShape, isPlaying, isOver, info } = store.getState();
  const togglePlaying = () => {
    if (isPlaying) store.dispatch(pauseGame());
    else if (isOver) store.dispatch(startGame());
    else store.dispatch(resumeGame());
  };

  return (
    <div className="info">
      <button onClick={togglePlaying}>{isPlaying ? 'PAUSE' : 'PLAY'}</button>
      <span><b>NEXT SHAPE:</b></span>
      <Shape nextShape={nextShape} />
      <span><b>SCORE:</b>{info.score}</span>
      <span><b>LEVEL:</b>{info.level}</span>
      <span><b>LINES:</b>{info.lines}</span>
    </div>
  );
};

export default Info;
