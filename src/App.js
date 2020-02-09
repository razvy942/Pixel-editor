import React, { useState } from 'react';

import Background from './components/Background';
import Layer from './components/Layer';
import Canvas from './components/Canvas';
import './App.css';

function App() {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [pixelSize, setPixelSize] = useState(32);
  const [canvasShouldBeCleared, setCanvasShouldBeCleared] = useState(false);

  const sizeOnChange = e => {
    let currentVal = e.target.value;
    currentVal.length === 0 ? (currentVal = 1) : (currentVal = currentVal);

    switch (e.target.id) {
      case 'width':
        setWidth(parseInt(currentVal));
        break;
      case 'height':
        setHeight(parseInt(currentVal));
        break;
      case 'pixel-size':
        setPixelSize(parseInt(currentVal));
        break;
      default:
        break;
    }
  };

  const clearCanvas = () => {
    setCanvasShouldBeCleared(!canvasShouldBeCleared);
  };

  return (
    <div className="App">
      <div className="canvas-options">
        <input
          id="width"
          placeholder="Select width"
          value={width}
          onChange={sizeOnChange}
        ></input>
        <input
          id="height"
          placeholder="Select height"
          value={height}
          onChange={sizeOnChange}
        ></input>
        <input
          id="pixel-size"
          placeholder="Select pixel size"
          value={pixelSize}
          onChange={sizeOnChange}
        ></input>
        <button onClick={clearCanvas}>Clear Canvas</button>
      </div>

      {/* <Background
        width={width}
        height={height}
        pixelSize={pixelSize}
        clearCanvas={canvasShouldBeCleared}
      />

      <Layer
        width={width}
        height={height}
        pixelSize={pixelSize}
        clearCanvas={canvasShouldBeCleared}
      /> */}

      <Canvas
        width={width}
        height={height}
        pixelSize={pixelSize}
        clearCanvas={canvasShouldBeCleared}
      />
    </div>
  );
}

export default App;
