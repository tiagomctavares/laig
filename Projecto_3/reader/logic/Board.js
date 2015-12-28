function Board(logic) {
    this.logic = logic;
    this.openSpaces = 36;
    this.whitePieces = 0;
    this.updateBoard();
    this.EMPTY_CELL = 'free';
    this.ROWS = this.COLUMNS = 8;
}

Board.prototype.isEmpty = function (x, y) {
    return this.getPieceAt(x, y) == this.EMPTY_CELL;
};

Board.prototype.getPieceAt = function (x, y) {
    return this.board[x*this.COLUMNS + y];
};

Board.prototype.placeWhitePiece = function(x, y) {
    this.logic.placeWhitePiece(x, y);
    this.updateBoard(this.logic.getGameState());
};

Board.prototype.placePiece = function(x, y) {
    this.logic.play(x, y);
    this.updateBoard(this.logic.getGameState());
};

Board.prototype.getRandomFreePosition = function() {
    var position = this.getRandomInt(0, this.openSpaces);
    position = this.resolvePosition(position);
    return new BoardPosition(position);
};

Board.prototype.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Board.prototype.resolvePosition = function (position) {
    var j = 0;
    for (var i = 0; i < this.board.length; i++) {
        if (this.board[i] == 'free') {
            if(j == position) {
                return i;
            } else {
                j++;
            }
        }
    }
};

Board.prototype.updateBoard = function () {
    var gameState = this.logic.getGameState();

    var board = gameState[0];
    this.board = [].concat.apply([], board);
    this.openSpaces = this.board.reduce(function(n, val) {
        return n + (val === 'free');
    }, 0);
    this.whitePieces = this.board.reduce(function(n, val) {
        return n + (val === 'whitePiece');
    }, 0)
};

function BoardPosition(position) {
    this.x = Math.floor(position/8);
    this.y = position%8;
}

BoardPosition.prototype.getX = function() {
    return this.x;
};

BoardPosition.prototype.getY = function() {
    return this.y;
};