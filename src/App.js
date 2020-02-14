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
  // make top layer default layer
  const [currentLayer, setCurrentLayer] = useState(2);

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

  const switchLayer = () => {
    if (currentLayer === 1) {
      setCurrentLayer(2);
    } else {
      setCurrentLayer(1);
    }
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
        <p>Currently on layer # {currentLayer}</p>
        <button onClick={switchLayer}>Switch layers</button>
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

      <div className="canvas-container">
        <Canvas
          width={width}
          height={height}
          pixelSize={pixelSize}
          clearCanvas={canvasShouldBeCleared}
          isTransparent={false}
          layerNumber={1}
          activeLayer={currentLayer}
        />
        <Canvas
          width={width}
          height={height}
          pixelSize={pixelSize}
          clearCanvas={canvasShouldBeCleared}
          isTransparent={true}
          layerNumber={2}
          activeLayer={currentLayer}
        />
      </div>
    </div>
  );
}

export default App;
