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
        this.hoop = {"x": 900, "y": 100}
        this.sign = 1;


    }
    doThisEveryFrame() {
        let spriteOrder = [this.spriteRef[0], this.spriteRef[1], this.spriteRef[2], this.spriteRef[1]];
        this.confetti();
        // Create sky and ground
        this.ctx.fillStyle = "#4bc3ea";
        this.ctx.fillRect(0, 0, this.cWidth, this.cHeight * 2 / 3);
        this.ctx.fillStyle = "#7CFC00";
        this.ctx.fillRect(0, this.cHeight * 2 / 3, this.cWidth, this.cHeight / 3);
        this.ctx.drawImage(spriteOrder[this.animStage], this.player.pos.x, 200, 100, 300)
        this.ctx.drawImage(document.getElementById("hoop"), this.hoop.x, this.hoop.y, 100, 100);
        if(this.animStage==0){
            this.ctx.drawImage(document.getElementById("ball"),this.player.pos.x+80, 300, 50, 50);
        } else if(this.animStage==1){
            this.ctx.drawImage(document.getElementById("ball"),this.player.pos.x+80, 375, 50, 50);
        } else if(this.animStage==2){
            this.ctx.drawImage(document.getElementById("ball"),this.player.pos.x+80, 450, 50, 50);
        } else if(this.animStage==3){
            this.ctx.drawImage(document.getElementById("ball"),this.player.pos.x+80, 375, 50, 50);
            this.sign += 1;
        }
        this.sign = this.sign % 2;
        let number = Math.floor(Math.random() * 60);
        if(this.sign == 0 && this.hoop.x <= this.cWidth-(number+125)){
            this.hoop.x += number;
        } else if(this.sign == 1 && this.hoop.x >= number+25) {
            this.hoop.x -= number;
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
        let keyPressed = {w: false, a: false, s: false, d: false, c:false}

        const oneTick = new Event('oneTick');
        document.addEventListener("keydown", function(e){
            if(e.key === "w") keyPressed.w = true;
            if(e.key === "a") keyPressed.a = true;
            if(e.key === "s") keyPressed.s = true;
            if(e.key === "d") keyPressed.d = true;
            if(e.key === "c") keyPressed.c = true
        });
        document.addEventListener("keyup", function(e){
            if (e.key === "w") keyPressed.w = false;
            if (e.key === "a") keyPressed.a = false;
            if (e.key === "s") keyPressed.s = false;
            if (e.key === "d") keyPressed.d = false;
            if (e.key === "c") keyPressed.c = false;
        });

        document.addEventListener("oneTick", function(e){
            //console.table(cursedRef.player.pos)
            cursedRef.player.pos.x -= keyPressed.a && cursedRef.player.pos.x>=-25 ? 20 : 0;
            cursedRef.player.pos.x += keyPressed.d && cursedRef.player.pos.x<=cursedRef.cWidth-125 ? 20 : 0;
            cursedRef.player.pos.y -= keyPressed.w && cursedRef.player.pos.y>=0 ? 2 : 0;
            cursedRef.player.pos.y += keyPressed.s && cursedRef.player.pos.y<=cursedRef.cHeight ? 2 : 0;
        })
        function tick() {
            document.dispatchEvent(oneTick);
        }
        console.log("this works");
        this.intervalReference = setInterval(tick, 100);
    }
    confettiRain(array){
        for(let i = 0; i < array.length; i++){
            let fallAmount = Math.floor(Math.random() * 10);
            array[i, 4] += fallAmount;
            let element = array[i];
            console.log(element);
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(element[1], element[0], element[3], element[2])
        }
    }

     confetti(){
        let cursed = this
        clearInterval(this.intervalReference);
        console.log("this works");
        console.log("ran");
        let array2d = [[]]
        let number = Math.floor(Math.random() * (160 - 50 + 1))+ 50;
        let colours = ["red", "green", "yellow", "blue"];
        for(let i = 0; i<number; i++){
            let randomX = Math.floor(Math.random() * 1000);
            let randomHeight = Math.floor(Math.random() * 2) + 1;
            let randomWidth = Math.floor(Math.random() * 2) + 1;
            let colour =  colours[Math.floor(Math.random() * 4)];
            console.log(colour)
            array2d[i] = [0, randomX, randomHeight, randomWidth, colour];
            console.log(array2d[i])
        }
        const tickNew = new Event('tickNew');
        function tick1() {
            document.dispatchEvent(tickNew);
            //this.confettiRain(array2d);
            for(let i = 0; i < array2d.length; i++){
                let fallAmount = Math.floor(Math.random() * 10);
                array2d[i][0] += fallAmount;
                console.log(fallAmount);
                let element = array2d[i];
                console.log(element);
                cursed.ctx.fillStyle = "red";
                cursed.ctx.fillRect(array2d[i][1], array2d[i][0], array2d[i][3], array2d[i][2])
                cursed.ctx.fillStyle = "#4bc3ea";
                cursed.ctx.fillRect(0, 0, cursed.cWidth, cursed.cHeight * 2 / 3);
            }
        }
        tick1();
        //setInterval(tick1, 1000);
       }
}

