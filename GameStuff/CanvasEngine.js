class CanvasEngine {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.cHeight = canvas.height;
        this.cWidth = canvas.width;
    }

    initialize() {
        console.log("creating world!");

        // Create sky and ground
        this.ctx.fillStyle = "#4bc3ea";
        this.ctx.fillRect(0, 0, this.cWidth, this.cHeight*2/3);
        this.ctx.fillStyle = "#7CFC00";
        this.ctx.fillRect(0, this.cHeight*2/3, this.cWidth, this.cHeight/3);


    }
}