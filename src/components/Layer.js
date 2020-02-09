import React, { Component } from 'react';

import Draw from '../util/canvasDrawing';
import Colors from '../util/Colors';

export default class Layer extends Component {
  state = {
    isMouseDown: false
  };

  canvasRef = React.createRef();
  mainCanvas;

  initializeCanvas = () => {
    // Main layer, pixels are drawn
    let c = this.canvasRef.current;
    this.mainCanvas = new Draw(
      c.getContext('2d'),
      this.props.width,
      this.props.height,
      this.props.pixelSize
    );
  };

  moveRectOnTopLayer = e => {
    this.mainCanvas.moveRect(
      e.clientX - this.canvasRef.current.getBoundingClientRect().x,
      e.clientY - this.canvasRef.current.getBoundingClientRect().y
    );
  };

  changeColor = e => {
    this.mainCanvas.setColor(e.target.value);
  };

  componentDidMount() {
    this.initializeCanvas();
    this.mainCanvas.createRect(32, 32, Colors.RED, 0, 0);
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentDidUpdate() {
    this.mainCanvas.clear();
    this.mainCanvas.setAllParams(
      this.props.height,
      this.props.width,
      this.props.pixelSize
    );
  }

  render() {
    return (
      <div>
        <canvas
          onMouseDown={e => {
            this.setState({ isMouseDown: true });
            this.moveRectOnTopLayer(e);
          }}
          onMouseUp={() => this.setState({ isMouseDown: false })}
          onMouseMove={e => {
            if (this.state.isMouseDown) {
              this.moveRectOnTopLayer(e);
            }
          }}
          className="canvas-top-layer"
          id="pixelCanvas"
          ref={this.canvasRef}
          width={this.props.width}
          height={this.props.height}
        ></canvas>
      </div>
    );
  }
}
