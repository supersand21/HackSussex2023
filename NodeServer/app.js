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


    if(url === "/GameStuff/main.js") res.sendFile("GameStuff/main.js", { root: a});
    if(url === "/Style.css") res.sendFile("Style.css", { root: a});
    if(url === "/GameStuff/CanvasEngine.js") res.sendFile("GameStuff/CanvasEngine.js", { root: a});
})


app.listen(80)