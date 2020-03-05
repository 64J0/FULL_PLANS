/*
    Nosso projeto neste capítulo é construir um ecossistema virtual, um mundo pequeno povoado com criaturas que se movem e luta pela sobrevivência.
    Mundo -> Grid bidimensional onde cada entidade ocupa um quadrado do grid.
*/

var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

// "#" -> Paredes e rochas
// "o" -> Bichos do ambiente

function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

var grid = ["top left", "top middle", "top right", "bottom left", "bottom middle", "bottom right"];
// console.log(grid[2 + (1 * 3)]); // -> bottom right 

function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}
Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width &&
        vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function(vector) {
    return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
};

var directions = {
    "n": new Vector(0, -1),
    "ne": new Vector(1, -1),
    "e": new Vector(1, 0),
    "se": new Vector(1, 1),
    "s": new Vector(0, 1),
    "sw": new Vector(-1, 1),
    "w": new Vector(-1, 0),
    "nw": new Vector(-1, -1)
};