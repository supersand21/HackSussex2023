class CanvasEngine {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.cHeight = canvas.height;
        this.cWidth = canvas.width;
        this.player = {"pos" : {"x": 0, "y": 0}, "vel": {"x": 0, "y": 0}};

    }

    initialize = () => {
        console.log("creating world!");

        // Create sky and ground
        this.ctx.fillStyle = "#4bc3ea";
        this.ctx.fillRect(0, 0, this.cWidth, this.cHeight*2/3);
        this.ctx.fillStyle = "#7CFC00";
        this.ctx.fillRect(0, this.cHeight*2/3, this.cWidth, this.cHeight/3);
        this.startInputListeners();

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
            console.table(cursedRef.player.pos)
            cursedRef.player.pos.x -= keyPressed.a && cursedRef.player.pos.x>=0 ? 1 : 0;
            cursedRef.player.pos.x += keyPressed.d && cursedRef.player.pos.x<=cursedRef.cWidth ? 1 : 0;
            cursedRef.player.pos.y -= keyPressed.w && cursedRef.player.pos.y>=0 ? 1 : 0;
            cursedRef.player.pos.y += keyPressed.s && cursedRef.player.pos.y<=cursedRef.cHeight ? 1 : 0;
        })
        function tick() {
            document.dispatchEvent(oneTick);
        }
        console.log("this works");
        setInterval(tick, 100);
    }

}
