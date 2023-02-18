class CanvasEngine {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.cHeight = canvas.height;
        this.cWidth = canvas.width;
        this.player = {"pos" : {"x": 100, "y": 100}, "vel": {"x": 0, "y": 0}};
        this.score = 0

    }
    doThisEveryFrame() {

        // Create sky and ground
        this.ctx.fillStyle = "#4bc3ea";
        this.ctx.fillRect(0, 0, this.cWidth, this.cHeight * 2 / 3);
        this.ctx.fillStyle = "#7CFC00";
        this.ctx.fillRect(0, this.cHeight * 2 / 3, this.cWidth, this.cHeight / 3);
        this.ctx.drawImage(document.getElementById("mg1"), this.player.pos.x, 200, 100, 300);
        this.ctx.drawImage(document.getElementById("ball"),this.player.pos.x+80, 300, 50, 50);
        this.ctx.drawImage(document.getElementById("hoop"), 900, 100, 50, 50);
        this.ctx.font = "30px Arial";
        this.ctx.fillText(this.score+"", 100, 100);
    }

    initialize = () => {
        console.log("creating world!");

        // Create sky and ground
        this.ctx.fillStyle = "#4bc3ea";
        this.ctx.fillRect(0, 0, this.cWidth, this.cHeight * 2 / 3);
        this.ctx.fillStyle = "#7CFC00";
        this.ctx.fillRect(0, this.cHeight * 2 / 3, this.cWidth, this.cHeight / 3);
        this.ctx.drawImage(document.getElementById("mg1"),  this.player.pos.x,  200, 100, 300);
        this.ctx.drawImage(document.getElementById("ball"), this.player.pos.x+80, 300, 50, 50);
        this.ctx.drawImage(document.getElementById("hoop"), 900, 100, 50, 50);
        this.ctx.font = "30px Arial";
        this.ctx.fillText(this.score+"", 100, 100);
        this.startInputListeners();
        document.addEventListener("oneTick", () => {this.doThisEveryFrame()})
    }



    startInputListeners() { // Start all key input event listeners
        let cursedRef = this;
        let keyPressed = {w: false, a: false, s: false, d: false}

        const oneTick = new Event('oneTick');
        document.addEventListener("keydown", function(e){
            if(e.key === "w") keyPressed.w = true;
            if(e.key === "a") keyPressed.a = true;
            if(e.key === "s") keyPressed.s = true;
            if(e.key === "d") keyPressed.d = true;
        });
        document.addEventListener("keyup", function(e){
            if (e.key === "w") keyPressed.w = false;
            if (e.key === "a") keyPressed.a = false;
            if (e.key === "s") keyPressed.s = false;
            if (e.key === "d") keyPressed.d = false;
        });

        document.addEventListener("oneTick", function(e){
            //console.table(cursedRef.player.pos)
            cursedRef.player.pos.x -= keyPressed.a && cursedRef.player.pos.x>=-25 ? 5 : 0;
            cursedRef.player.pos.x += keyPressed.d && cursedRef.player.pos.x<=cursedRef.cWidth-125 ? 5 : 0;
            cursedRef.player.pos.y -= keyPressed.w && cursedRef.player.pos.y>=0 ? 5 : 0;
            cursedRef.player.pos.y += keyPressed.s && cursedRef.player.pos.y<=cursedRef.cHeight ? 5 : 0;
        })
        function tick() {
            document.dispatchEvent(oneTick);
        }
        console.log("this works");
        setInterval(tick, 16.66);
    }

}
