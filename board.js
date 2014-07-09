var Game = require('./game');

function Board(game) {
    this.matrix = [new Array(8), new Array(8), new Array(8), new Array(8), 
                  new Array(8), new Array(8), new Array(8), new Array(8)];
    this.game = game;
};

Board.prototype.positionValid = function (position) {
    var x = position[0];
    var y = position[1];
    
    if (this.onBoard(x, y) && this.matrix[x][y] == undefined) {
        this.matrix[x][y] = this.game.current_color;
        this.pieceToFlip(x,y);
        return true
    } else {
        return false
    }
};

Board.prototype.pieceToFlip = function (x, y) {
    var diffs = [[1, 0], [1, 1], [0, 1], [-1, 1],
                 [-1, 0], [-1, -1], [0, -1], [1, -1]];
    var currentPiece = this.matrix[x][y];

    diffs.forEach(function (diff) {
        var newPiece = this.matrix[x + diff[0]][y + diff[1]];
        var visitedPieces = [];
        
        if (newPiece == undefined || !this.onBoard(x + diff[0], y + diff[1])) {
            return;
        } else if (newPiece !== currentPiece) {
            visitedPieces.push(newPiece);
        } else if (newPiece == currentPiece) {
            visitedPieces.forEach(function (piece) {
                this.flip(piece);
            })
        }
    })
};


Board.prototype.flip = function (piece) {
    piece == "black" ? piece = "white" : piece = "black";
};

Board.prototype.game_over = function () {
    if (this.matrix.some(function (piece) { return (piece == undefined) })) {
        return false;
    } else {      
        array = [].concat.apply([], this.matrix);
        var black = 0;
        var white = 0;
        
        array.forEach(function(piece) {
            (piece == "black") ? black++ : white++;
        })
        
        if (black == white) {
            console.log("Tie Game. Player1 and Player2 both have 32 points.");
        } else if (black > white) {
            console.log("Player1 wins! Player1: " + black + "points, Player2: " + white + "points");
        } else {
             console.log("Player1 wins! Player1: " + black + "points, Player2: " + white + "points");
        }
    }
}

Board.prototype.onBoard = function (x, y) {
    return (x > 0 && x < 9 && y > 0 && y < 9);
};

Board.prototype.display = function() {
    var reversed = this.matrix.reverse();
    for (var i = 7; i >= 0; i--) {
        console.log(this.matrix[i]);
    }
}

module.exports = Board;
