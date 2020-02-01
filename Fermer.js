class Fermer extends LivingCreature{
    constructor(x, y, index) {
        // this.x = x;
        // this.y = y;
        // this.index = index;
        super(x, y, index);// HARC KA aranc super xi chashxatec?
    }
    //vorpes method
   /* getNewCoordinates() {
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

    }*/
    //getNewCoordinates-y jarangum a

    chooseCell(character) {
        super.getNewCoordinates();  //CHISHT A?
        return super.chooseCell(character);
    }
    move() {  //qayluma
        var newCell = random(this.chooseCell(0));  //yntruma vandak

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