import React from 'react';

import './Test.css';

export default function Test() {
  const card = [];
  for (let i = 1; i < 101; i++) {
    if (i % 2 == 0) {
      card.push(<span className="square square-even">{i}</span>);
    } else {
      card.push(<span className="square ">{i}</span>);
    }
  }
  return (
    <div className="board">
      {/* <h1>1</h1> */}
      {card}
    </div>
  );
}
