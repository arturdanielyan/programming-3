class Fermer {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    chooseCell(character) {
        this.getNewCoordinates();
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
    //qayluma
    move() {

        //yntruma vandak
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 1;
            var newGrass = new Grass(this.x, this.y, 1);
            grassArr.push(newGrass);
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
        }
    }
    killMol(){
        var newCell = random(this.chooseCell(5));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in molakhotArr) {
                if (newX == molakhotArr[i].x && newY == molakhotArr[i].y) {
                    molakhotArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
        }
    }
}