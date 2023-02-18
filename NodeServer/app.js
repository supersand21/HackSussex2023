const express = require('express')
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
let a = process.cwd();


app.get('/', function (req, res) {
    res.sendFile('StartScreen.html', { root: a});
})

app.use(bodyParser.json(), async (req, res) => {
    let url = req["url"];
    console.log(url);
    if(url === "/game") res.sendFile("GameScreen.html", { root: a});
    if(url === "/favicon.ico") res.sendFile("Images/Ball.png", { root: a});
    if(url === "/GameStuff/main.js") res.sendFile("GameStuff/main.js", { root: a});
    if(url === "/Style.css") res.sendFile("Style.css", { root: a});


    // Game Sprites:
    if(url === "/GameStuff/CanvasEngine.js") res.sendFile("GameStuff/CanvasEngine.js", { root: a});
    if(url === "/Images/manDribble1.png") res.sendFile("Images/manDribble1.png", { root: a});
    if(url === "/Images/manDribble2.png") res.sendFile("Images/manDribble2.png", { root: a});
    if(url === "/Images/manDribble3.png") res.sendFile("Images/manDribble3.png", { root: a});
    if(url === "/Images/manShoot1.png") res.sendFile("Images/manShoot1.png", { root: a});
    if(url === "/Images/manShoot2.png") res.sendFile("Images/manShoot2.png", { root: a});
    if(url === "/Images/manShoot3.png") res.sendFile("Images/manShoot3.png", { root: a});
    if(url === "/Images/Ball.png") res.sendFile("Images/Ball.png", { root: a});
    if(url === "/Images/hoop.png") res.sendFile("Images/hoop.png", { root: a});
})


app.listen(80)