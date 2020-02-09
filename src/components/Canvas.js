import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Draw from '../util/canvasDrawing';
import Colors from '../util/Colors';
import './Canvas.css';

// TODO: create grid and give each square a size defined in props for canvas

class Canvas extends Component {
  state = {
    isMouseDown: false
  };

  canvasRef = React.createRef();
  canvasRefBackground = React.createRef();
  canvasGridLayer = React.createRef();

  mainCanvas;
  backgroundCanvas;

  initializeCanvas = () => {
    // Main layer, pixels are drawn
    let c = this.canvasRef.current;
    this.mainCanvas = new Draw(
      c.getContext('2d'),
      this.props.width,
      this.props.height,
      this.props.pixelSize
    );
    // Background layer, used for the mouse drop shadow
    c = this.canvasRefBackground.current;
    this.backgroundCanvas = new Draw(
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

  colorBackgroundGrid = e => {
    this.backgroundCanvas.colorGridOnHover(
      e,
      this.canvasRefBackground.current.getBoundingClientRect().x,
      this.canvasRefBackground.current.getBoundingClientRect().y
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
    this.backgroundCanvas.setAllParams(
      this.props.height,
      this.props.width,
      this.props.pixelSize
    );
  }

  render() {
    return (
      <div>
        <button value={Colors.RED} onClick={this.changeColor}>
          RED
        </button>
        <button value={Colors.BLUE} onClick={this.changeColor}>
          BLUE
        </button>
        <canvas
          id="grid-layer"
          className="canvas-grid-layer"
          ref={this.canvasGridLayer}
          width={this.props.width}
          height={this.props.height}
        ></canvas>
        <canvas
          id="background-layer"
          className="canvas-bottom-layer"
          ref={this.canvasRefBackground}
          width={this.props.width}
          height={this.props.height}
        ></canvas>
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
            this.colorBackgroundGrid(e);
          }}
          onMouseLeave={() => this.backgroundCanvas.clear()}
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

Canvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default Canvas;
