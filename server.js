var Grass = require("./Grass");
var GrassEater = require("./GrassEater");
var Gishatich = require("./Gishatich");
var Fermer = require("./Fermer");
var Molakhot = require("./Molakhot");

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

/////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {
    res.redirect('index.html');
});


server.listen(3000);

grassArr = [];
grassEaterArr = [];
gishatichArr = [];
var fermerArr = [];
molakhotArr = [];

matrix = []; // Մատրիցի ստեղծում

let rows = 35; // Տողերի քանակ
let columns = 35; // Սյուների քանակ

for (let y = 0; y < rows; y++) {
    matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 50 && a < 55) {
            matrix[y][x] = 1;
        }
        else if (a >= 60 && a < 70) {
            matrix[y][x] = 2;
        }
        else if (a >= 70 && a < 80) {
            matrix[y][x] = 3;
        }
        else if (a >= 80 && a < 90) {
            matrix[y][x] = 4;
        }
        else if (a >= 90 && a < 100) {
            matrix[y][x] = 5;
        }
        else {
            matrix[y][x] = 0;
        }
    }
}

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr)
        }
        else if (matrix[y][x] == 2) {
            var et = new GrassEater(x, y, 2);
            grassEaterArr.push(et);

        }
        else if (matrix[y][x] == 3) {
            var gsho = new Gishatich(x, y, 3);
            gishatichArr.push(gsho);

        }
        else if (matrix[y][x] == 4) {
            var fermer = new Fermer(x, y, 4);
            fermerArr.push(fermer);
        }
        else if (matrix[y][x] == 5) {
            var mol = new Molakhot(x, y, 5);
            molakhotArr.push(mol);
        }
    }
    //io.sockets.emit("sendMatrix", matrix);
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();
    }

    for (var i in gishatichArr) {
        gishatichArr[i].move();
        gishatichArr[i].eat();
        gishatichArr[i].mul();
        gishatichArr[i].die();
    }

    for (var i in molakhotArr) {
        molakhotArr[i].mul();
        molakhotArr[i].mulOnGrass();
        molakhotArr[i].move();
    }

    for (var i in fermerArr) {
        fermerArr[i].move();
        fermerArr[i].killMol();
    }

    io.sockets.emit("sendMatrix", matrix);
}

setInterval(game, 1000);



io.on('connection', function (socket) {
    socket.on("Explosion", function (data) {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                //console.log("mtav for var x");
                if (x < 12 && y < 12) {
                    console.log(matrix[y][x]);
                    matrix[y][x] = 0;
                    io.sockets.emit("sendMatrix", matrix);
                    if (matrix[y][x] = 1) {
                        for (let i in grassArr) {
                            if (grassEaterArr[i].x == x && grassArr[i].y == y) {
                                grassArr.splice([i], 1)
                            }
                        }
                    }
                    if (matrix[y][x] = 2) {
                        for (let i in grassEaterArr) {
                            if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                                grassEaterArr.splice([i], 1)
                            }
                        }
                    }
                    if (matrix[y][x] = 3) {
                        for (let i in gishatichArr) {
                            if (gishatichArr[i].x == x && gishatichArr[i].y == y) {
                                gishatichArr.splice([i], 1)
                            }
                        }
                    }
                    if (matrix[y][x] = 4) {
                        for (let i in fermerArr) {
                            if (fermerArr[i].x == x && fermerArr[i].y == y) {
                                fermerArr.splice([i], 1)
                            }
                        }
                    }
                    if (matrix[y][x] = 5) {
                        for (let i in molakhotArr) {
                            if (molakhotArr[i].x == x && molakhotArr[i].y == y) {
                                molakhotArr.splice([i], 1)
                            }
                        }
                    }
                }
            }
        }
    });
});
