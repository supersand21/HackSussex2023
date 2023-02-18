const express = require('express')
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();

let a = process.cwd();

app.get('/', function (req, res) {
    res.sendFile('StartScreen.html', { root: a});
})


app.listen(80)