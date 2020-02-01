let matrix = []; // Մատրիցի ստեղծում
let rows = 35; // Տողերի քանակ
let columns = 35; // Սյուների քանակ

for (let y = 0; y < rows; y++) {
matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
for (let x = 0; x < columns; x++) {
let a = Math.floor(Math.random() * 100);
if (a >= 0 && a < 20) {
matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
}
if (a >= 20 && a < 40) {
matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
}
else if (a >= 40 && a < 65) {
matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
}
else if (a >= 65 && a < 80) {
matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
}
else if (a >= 80 && a < 90) {
matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
}
else if (a >= 90 && a < 100) {
matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
}
}
}



// var matrix = [
//     [0, 0, 0, 0],
//     [0, 5, 2, 0],
//     [0, 5, 0, 0],
//     [0, 0, 0, 0],
// ]



// stex zangvacnery verjum Arr barov
var grassArr = [];
var grassEaterArr = [];
var gishatichArr = [];
var fermerArr = [];
var molakhotArr = [];
var side = 12;



function setup() {
    frameRate(60);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    //noStroke();

    
//pttvum em matrix mejov u stexcum em object

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x,y,2);
                grassEaterArr.push(et);
                
            }
            else if (matrix[y][x] == 3) {
                var gsho = new Gishatich(x,y,3);
                gishatichArr.push(gsho);
                
            }
            else if (matrix[y][x] == 4) {
                var fermer = new Fermer(x,y,4);  
                fermerArr.push(fermer);
            }
            else if (matrix[y][x] == 5) {
                var mol = new Molakhot(x,y,5);  
                molakhotArr.push(mol);
            }
        }
    }
 
}
//draw uxaki nerkuma
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

    //kanchum em methodnery
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
    for(var i in molakhotArr){
        molakhotArr[i].mul();
        molakhotArr[i].mulOnGrass();
        molakhotArr[i].move();
    }
    for(var i in fermerArr){
        fermerArr[i].move(); 
        fermerArr[i].killMol();  
    }

}






