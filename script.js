var socket = io();
var side = 12;
var matrix = [];

function setup() {
    createCanvas(35 * side, 35 * side);
    background('#acacac');
    //noStroke();
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill(67, 60, 86);
            }
            else if(matrix[y][x] == 5){
                fill("black"); 
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

function handleMatrix(m) {
    matrix = m;
}

socket.on("sendMatrix", handleMatrix);



function Explosion(){
    console.log("CHI ASHXATUM");
    socket.emit("Explosion", null)
 }
 
 var p = document.getElementById("expbut");
 p.addEventListener("click", Explosion);
