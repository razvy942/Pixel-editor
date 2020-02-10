import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Draw from '../util/canvasDrawing';
import Colors from '../util/Colors';
import classes from './Canvas.module.css';

// TODO: Make width global so all layers get resized
class Canvas extends Component {
  state = {
    isMouseDown: false,
    windowWidth: window.innerWidth,
    isTransparent: this.props.isTransparent
  };

  canvasRef = React.createRef();
  canvasRefBackground = React.createRef();
  canvasGridLayer = React.createRef();

  mainCanvas;
  backgroundCanvas;
  resizeTimeout;

  initializeCanvas = () => {
    // Main layer, pixels are drawn
    let c = this.canvasRef.current;
    this.mainCanvas = new Draw(
      c.getContext('2d'),
      this.props.width,
      this.props.height,
      this.props.pixelSize,
      this.state.isTransparent
    );
    // Background layer, used for the mouse drop shadow
    c = this.canvasRefBackground.current;
    this.backgroundCanvas = new Draw(
      c.getContext('2d'),
      this.props.width,
      this.props.height,
      this.props.pixelSize,
      'background'
    );

    if (!this.state.isTransparent) {
      this.mainCanvas.ctx.font = '20px Georgia';
      this.mainCanvas.ctx.fillText('Hello World!', 10, 50);
    } else {
      this.mainCanvas.ctx.font = '20px Georgia';
      this.mainCanvas.ctx.fillText('Hello World! from2', 30, 50);
    }
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

  handleResize = () => {
    console.log(window.innerWidth);
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  componentDidMount() {
    console.log(window.innerWidth);

    // Canvas is an absolute positioned element, centering needs to be done in javascript
    window.onresize = () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.handleResize, 100);
    };

    this.initializeCanvas();
    this.mainCanvas.createRect(32, 32, Colors.RED, 0, 0);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) this.mainCanvas.clear();

    return (
      this.props !== nextProps ||
      this.state.windowWidth !== nextState.windowWidth
    );
  }

  componentDidUpdate() {
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
    this.backgroundCanvas.clear();
  }

  render() {
    const centerPos = this.state.windowWidth / 2 - this.props.width / 2 + 'px';
    const isVisibile = true;
    const centerPosStyle = { left: centerPos };
    const showBackground = { display: isVisibile };
    return (
      <div>
        <button value={Colors.RED} onClick={this.changeColor}>
          RED
        </button>
        <button value={Colors.BLUE} onClick={this.changeColor}>
          BLUE
        </button>

        <canvas
          id="background-layer"
          style={{ ...centerPosStyle, ...showBackground }}
          className={classes.canvasBottomLayer}
          ref={this.canvasRefBackground}
          width={this.props.width}
          height={this.props.height}
        ></canvas>
        <canvas
          id="pixelCanvas"
          style={centerPosStyle}
          className={classes.canvasTopLayer}
          onMouseDown={e => {
            this.setState({ isMouseDown: true });
            this.moveRectOnTopLayer(e);
          }}
          onMouseUp={() => this.setState({ isMouseDown: false })}
          onMouseEnter={() => this.setState({ isMouseDown: false })}
          onMouseMove={e => {
            if (this.state.isMouseDown) {
              this.moveRectOnTopLayer(e);
            }
            this.colorBackgroundGrid(e);
          }}
          onMouseLeave={() => this.backgroundCanvas.clear()}
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
