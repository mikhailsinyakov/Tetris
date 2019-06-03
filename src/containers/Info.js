import React from 'react';
import Shape from '../components/Shape';
import '../stylesheets/Info.css';
import store from '../store';

const Info = () => {
  const { nextShape, isPlaying, info } = store.getState();

  return (
    <div className="info">
      <button>{isPlaying ? 'PAUSE' : 'PLAY'}</button>
      <span><b>NEXT SHAPE:</b></span>
      <Shape nextShape={nextShape} />
      <span><b>SCORE:</b>{info.score}</span>
      <span><b>LEVEL:</b>{info.level}</span>
      <span><b>LINES:</b>{info.lines}</span>
    </div>
  );
};

export default Info;
