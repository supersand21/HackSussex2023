class CanvasEngine {

    constructor(canvas) {
        this.animStage = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.cHeight = canvas.height;
        this.cWidth = canvas.width;
        this.player = {"pos" : {"x": 0, "y": 0}, "vel": {"x": 0, "y": 0}};
        this.spriteRef = [
            document.getElementById("md1"),
            document.getElementById("md2"),
            document.getElementById("md3"),
            document.getElementById("ms1"),
            document.getElementById("ms2"),
            document.getElementById("ms3")
        ]


    }
    doThisEveryFrame() {
        let spriteOrder = [this.spriteRef[0], this.spriteRef[1], this.spriteRef[2], this.spriteRef[1]]
        // Create sky and ground
        this.ctx.fillStyle = "#4bc3ea";
        this.ctx.fillRect(0, 0, this.cWidth, this.cHeight * 2 / 3);
        this.ctx.fillStyle = "#7CFC00";
        this.ctx.fillRect(0, this.cHeight * 2 / 3, this.cWidth, this.cHeight / 3);
        this.ctx.drawImage(spriteOrder[this.animStage], this.player.pos.x, 200, 100, 300)
        this.ctx.drawImage(document.getElementById("hoop"), 900, 100, 100, 100);
        if(this.animStage==0){
            this.ctx.drawImage(document.getElementById("ball"),this.player.pos.x+80, 300, 50, 50);
        } else if(this.animStage==1){
            this.ctx.drawImage(document.getElementById("ball"),this.player.pos.x+80, 375, 50, 50);
        } else if(this.animStage==2){
            this.ctx.drawImage(document.getElementById("ball"),this.player.pos.x+80, 450, 50, 50);
        } else if(this.animStage==3){
            this.ctx.drawImage(document.getElementById("ball"),this.player.pos.x+80, 375, 50, 50);
        }

        // Animation cycle has 5 stages
        this.animStage++;
        this.animStage = this.animStage % 4;
    }

    initialize = () => {
        console.log("creating world!");

        // Create sky and ground
        this.ctx.fillStyle = "#4bc3ea";
        this.ctx.fillRect(0, 0, this.cWidth, this.cHeight * 2 / 3);
        this.ctx.fillStyle = "#7CFC00";
        this.ctx.fillRect(0, this.cHeight * 2 / 3, this.cWidth, this.cHeight / 3);
        this.ctx.drawImage(document.getElementById("md1"), 100, 100, 100, 300)
        this.ctx.drawImage(document.getElementById("hoop"), 900, 100, 100, 100);
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
            cursedRef.player.pos.x -= keyPressed.a && cursedRef.player.pos.x>=0 ? 2 : 0;
            cursedRef.player.pos.x += keyPressed.d && cursedRef.player.pos.x<=cursedRef.cWidth ? 2 : 0;
            cursedRef.player.pos.y -= keyPressed.w && cursedRef.player.pos.y>=0 ? 2 : 0;
            cursedRef.player.pos.y += keyPressed.s && cursedRef.player.pos.y<=cursedRef.cHeight ? 2 : 0;
        })
        function tick() {
            document.dispatchEvent(oneTick);
        }
        console.log("this works");
        setInterval(tick, 100);
    }

}
