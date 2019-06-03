import React from 'react';
import '../stylesheets/Info.css';

const Info = () => {
  return (
    <div className="info">
      <button>PAUSE</button>
      <span><b>NEXT SHAPE:</b></span>
      <span></span>
      <span><b>SCORE:</b>1000</span>
      <span><b>LEVEL:</b>1</span>
      <span><b>LINES:</b>0</span>
    </div>
  );
};

export default Info;
