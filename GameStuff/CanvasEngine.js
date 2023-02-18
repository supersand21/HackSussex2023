class CanvasEngine {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.cHeight = canvas.height;
        this.cWidth = canvas.width;
        this.throwState = 0;
        this.animStage = 0;
        this.player = {"pos" : {"x": 0, "y": 0}, "vel": {"x": 0, "y": 0, "maxV": 20}};
        this.spriteRef = [
            document.getElementById("md1"),
            document.getElementById("md2"),
            document.getElementById("md3"),
            document.getElementById("ms1"),
            document.getElementById("ms2"),
            document.getElementById("ms3"),
            document.getElementById("ball")
        ]

    }
    doThisEveryFrame() {
        let dribbleOrder = [this.spriteRef[0], this.spriteRef[1], this.spriteRef[2], this.spriteRef[1]];
        let throwOrder = [this.spriteRef[0], this.spriteRef[3], this.spriteRef[4], this.spriteRef[5], this.spriteRef[4], this.spriteRef[3], this.spriteRef[0], this.spriteRef[1]];

        // Create sky and ground
        this.ctx.fillStyle = "#4bc3ea";
        this.ctx.fillRect(0, 0, this.cWidth, this.cHeight * 2 / 3);
        this.ctx.fillStyle = "#7CFC00";
        this.ctx.fillRect(0, this.cHeight * 2 / 3, this.cWidth, this.cHeight / 3);

        this.ctx.drawImage(document.getElementById("hoop"), 900, 100, 100, 100);


        console.log(this.animStage)
        console.log(this.throwState)

        if((this.throwState === 1  && this.animStage === 0) || this.throwState === 2) { // Throw animation stage 1
            this.ctx.drawImage(throwOrder[this.animStage], this.player.pos.x, 200, 100, 300)
            this.throwState = this.animStage === 3 ? 3 : 2;

            if(this.animStage===0) this.ctx.drawImage(this.spriteRef[6],this.player.pos.x +    80, 300, 50, 50);
            else if(this.animStage===1) this.ctx.drawImage(this.spriteRef[6],this.player.pos.x+60, 200, 50, 50);
            else if(this.animStage===2) this.ctx.drawImage(this.spriteRef[6],this.player.pos.x   , 170, 50, 50);
            else if(this.animStage===3) this.ctx.drawImage(this.spriteRef[6],this.player.pos.x-30, 190, 50, 50);

        } else if(this.throwState === 3) { // Throw animation stage 2
            this.ctx.drawImage(throwOrder[4 + this.animStage], this.player.pos.x, 200, 100, 300)
            this.throwState = 4;

            if(this.animStage===0) this.ctx.drawImage(this.spriteRef[6],this.player.pos.x, 170, 50, 50);

        } else if(this.throwState === 4) { // Throw animation stage 3


        } else { // Dribble animation
            this.ctx.drawImage(dribbleOrder[this.animStage], this.player.pos.x, 200, 100, 300)
            if(this.animStage===0) this.ctx.drawImage(this.spriteRef[6],this.player.pos.x+80, 300, 50, 50);
            else if(this.animStage===1) this.ctx.drawImage(this.spriteRef[6],this.player.pos.x+80, 375, 50, 50);
            else if(this.animStage===2) this.ctx.drawImage(this.spriteRef[6],this.player.pos.x+80, 450, 50, 50);
            else if(this.animStage===3) this.ctx.drawImage(this.spriteRef[6],this.player.pos.x+80, 375, 50, 50);
        }

        // Animation cycle has 4 stages
        this.animStage++;
        this.animStage = this.animStage % 4;
    }

    initialize = () => {
        console.log("creating world!");

        // Create sky and ground
        this.doThisEveryFrame()
        this.startInputListeners();
        document.addEventListener("oneTick", () => {this.doThisEveryFrame()})
    }

    startInputListeners() { // Start all key input event listeners
        let cursedRef = this;
        let keyPressed = {w: false, a: false, s: false, d: false}

        const oneTick = new Event('oneTick');
        document.addEventListener("keydown", function(e){
            //console.log(e.key)
            if(e.key === "w") keyPressed.w = true;
            if(e.key === "a") keyPressed.a = true;
            if(e.key === "s") keyPressed.s = true;
            if(e.key === "d") keyPressed.d = true;
            if(e.key === " ") cursedRef.throwState = 1;

        });
        document.addEventListener("keyup", function(e){
            if (e.key === "w") keyPressed.w = false;
            if (e.key === "a") keyPressed.a = false;
            if (e.key === "s") keyPressed.s = false;
            if (e.key === "d") keyPressed.d = false;
        });

        document.addEventListener("oneTick", function(e){
            let movementAccel = 5;
            cursedRef.player.vel.x -= keyPressed.a && cursedRef.player.vel.x>=-cursedRef.player.vel.maxV ? movementAccel : 0;
            cursedRef.player.vel.x += keyPressed.d && cursedRef.player.vel.x<= cursedRef.player.vel.maxV ? movementAccel : 0;

            //Normalize velocity to zero if no keys pressed.
            if(!keyPressed.a && !keyPressed.d && cursedRef.player.vel.x !== 0) cursedRef.player.vel.x += cursedRef.player.vel.x < 0 ? movementAccel : -movementAccel;

            cursedRef.player.pos.x += cursedRef.player.vel.x;
            cursedRef.player.pos.x = Math.max(0, Math.min(cursedRef.player.pos.x, cursedRef.cWidth - 100));
            cursedRef.player.pos.y -= keyPressed.w && cursedRef.player.pos.y>=0 ? movementAccel: 0;
            cursedRef.player.pos.y += keyPressed.s && cursedRef.player.pos.y<=cursedRef.cHeight ? movementAccel : 0;
        })
        function tick() {
            document.dispatchEvent(oneTick);
        }
        console.log("this works");
        setInterval(tick, 500);
    }

}
