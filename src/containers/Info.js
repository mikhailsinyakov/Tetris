import React from 'react';
import Shape from '../components/Shape';
import '../stylesheets/Info.css';
import store from '../store';
import { startGame, pauseGame, resumeGame, updateShapeShadow } from '../actions';

const Info = () => {
  const { nextShape, isPlaying, isOver, info } = store.getState();
  const togglePlaying = () => {
    if (isPlaying) store.dispatch(pauseGame());
    else if (isOver) {
      store.dispatch(startGame());
      const { activeShape, filledCells } = store.getState();
      store.dispatch(updateShapeShadow(activeShape, filledCells));
    }
    else store.dispatch(resumeGame());
  };

  return (
    <div className="info">
      <button id="toggle-playing" onClick={togglePlaying} >
        {isPlaying ? 'PAUSE' : 'PLAY'}
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
