import Colors from './Colors';

class Draw {
  constructor(ctx, width, height, pixelSize, canvasType, isTransparent) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.pixelSize = pixelSize;
    this.color = Colors.RED;
    this.canvasType = canvasType;
    this.isTransparent = isTransparent;

    // keep track of all changes
    this.historyStack = [];

    this.clear();
  }

  setHeight = height => {
    this.height = height;
  };

  setWidth = width => {
    this.width = width;
  };

  setPixelSize = pixelSize => {
    this.pixelSize = pixelSize;
  };

  setColor = color => {
    this.color = color;
  };

  setAllParams = (height, width, pixelSize) => {
    this.height = height;
    this.width = width;
    this.pixelSize = pixelSize;
  };

  createRect = (w, h, color, posX = 0, posY = 0) => {
    // Straddling the pixels, otherwise lines end up looking super blurry
    this.ctx.translate(0.5, 0.5);

    this.ctx.fillStyle = color;
    this.ctx.fillRect(posX, posY, w, h);
    this.ctx.translate(-0.5, -0.5);

    const rect = { w: w, h: h, posX: posX, posY: posY };
    this.historyStack.push(rect);
    return rect;
  };

  createGrid = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.translate(0.5, 0.5);

    this.ctx.beginPath();

    for (let h = 0; h <= this.height; h += this.pixelSize) {
      this.ctx.moveTo(0, h);
      this.ctx.lineTo(this.width, h);
    }

    for (let w = 0; w <= this.width; w += this.pixelSize) {
      this.ctx.moveTo(w, 0);
      this.ctx.lineTo(w, this.height);
    }

    this.ctx.strokeStyle = 'rgba(0,0,0,1)';
    this.ctx.stroke();

    this.ctx.translate(-0.5, -0.5);
  };

  moveRect = (offsetX, offsetY) => {
    let newPosX = offsetX;
    let newPosY = offsetY;
    // this.createGrid();
    // this.ctx.clearRect(
    //   this.square1.posX,
    //   this.square1.posY,
    //   this.square1.w + 1,
    //   this.square1.h
    // );

    const gridPosX = Math.floor(newPosX / this.pixelSize) * this.pixelSize; // Get start position inside grid
    const gridPosY = Math.floor(newPosY / this.pixelSize) * this.pixelSize; // Get start position inside grid

    const square = this.createRect(
      this.pixelSize,
      this.pixelSize,
      this.color,
      //newPosX - rect.w / 2,
      //newPosY - rect.h / 2
      gridPosX,
      gridPosY
    );
    //console.log(square);

    return square;
  };

  clear = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (this.canvasType === 'background') {
      this.fillBackground();
    }
  };

  colorGridOnHover = (e, offsetX, offsetY) => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    let xPos = e.clientX - offsetX;
    let yPos = e.clientY - offsetY;

    const gridPosX = Math.floor(xPos / this.pixelSize) * this.pixelSize; // Get start position inside grid
    const gridPosY = Math.floor(yPos / this.pixelSize) * this.pixelSize; // Get start position inside grid
    this.fillBackground();
    this.createRect(
      this.pixelSize,
      this.pixelSize,
      Colors.GREY,
      gridPosX,
      gridPosY,
      this.ctx
    );
  };

  fillBackground = () => {
    if (this.isTransparent) {
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    } else {
      this.ctx.fillStyle = 'white';
    }
    this.ctx.fillRect(0, 0, this.width, this.height);
  };

  reconstruct = () => {
    // Recreate the entire canvas as it was when state changes
  };
}

export default Draw;
