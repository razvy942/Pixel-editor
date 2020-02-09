import React, { Component } from 'react';

import Draw from '../util/canvasDrawing';
import Colors from '../util/Colors';

export default class Background extends Component {
  canvasRef = React.createRef();
  backgroundCanvas;

  initializeCanvas = () => {
    const c = this.canvasRef.current;
    this.backgroundCanvas = new Draw(
      c.getContext('2d'),
      this.props.width,
      this.props.height,
      this.props.pixelSize
    );
  };

  colorBackgroundGrid = e => {
    this.backgroundCanvas.colorGridOnHover(
      e,
      this.canvasRef.current.getBoundingClientRect().x,
      this.canvasRef.current.getBoundingClientRect().y
    );
  };

  componentDidMount() {
    this.initializeCanvas();
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentDidUpdate() {
    this.backgroundCanvas.setAllParams(
      this.props.height,
      this.props.width,
      this.props.pixelSize
    );
  }

  render() {
    return (
      <div>
        <canvas
          id="background-layer"
          className="canvas-bottom-layer"
          ref={this.canvasRef}
          width={this.props.width}
          height={this.props.height}
          onMouseMove={e => {
            this.colorBackgroundGrid(e);
          }}
          onMouseLeave={() => this.backgroundCanvas.clear()}
        ></canvas>
      </div>
    );
  }
}
