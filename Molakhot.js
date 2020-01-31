//var LivingCreature = require("./LivingCreature")

class Molakhot extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.multiplyGr = 0;//chka
    }

    //yntruma shrjaka 8 vandakner
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    // bazmanuma azat vandakneri himan vra
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));

        if (this.multiply >= 2 && newCell) {
            var newMolakhot = new Molakhot(newCell[0], newCell[1], this.index);
            molakhotArr.push(newMolakhot);
            matrix[newCell[1]][newCell[0]] = 5;
            this.multiply = 0;
        }
    }
    mulOnGrass(){
        this.multiplyGr++
        var newCell = random(this.chooseCell(1));

        if (newCell && this.multiplyGr == 2) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.index;
            var newMolakhot = new Molakhot(newX, newY, this.index);
            molakhotArr.push(newMolakhot);
            this.multiplyGr = 0;
        }
    }
    move() {

        //yntruma vandak
        var z = Math.floor(random(2));
        if(z == 1){
            z += 1;
        }

        var newCell = random(this.chooseCell(z));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            
            if(z == 0){
                matrix[this.y][this.x] = 0
            } 
            else{
                matrix[this.y][this.x] = 2;
                var newGrassEater = new GrassEater(this.x, this.y, 2);
                grassEaterArr.push(newGrassEater);
            }
            
            
            
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.energy--;
        }

    }
}