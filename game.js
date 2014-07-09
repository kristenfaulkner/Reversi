var Board = require('./board');
var readline = require('readline');


function Game () {

    this.board = new Board(this);
    this.current_color = "black";
    this.play(this.current_color);
}

Game.prototype.play = function (color) {
    this.board.display();
    this.getPosition();
}

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

Game.prototype.getPosition = function() {
    var that = this
    reader.question("Which square would you like to set your piece onto? Enter as coordinates [x,y]\n", 
    function (response) {
        while (!that.board.positionValid(response)) {
            that.play;
        } 
        that.current_color = (that.current_color == "black" ? "white" : "black");
        that.play(that.current_color);
    })
}

module.exports = Game;


