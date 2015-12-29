function GameLogic() {
    this.logic = new PrologInterface();
    this.board = new Board(this.logic);
    this.maxWhitePieces = 5;
    this.playLog = new PlayLog();
}

GameLogic.prototype.playPosition = function (position, pieceUsed) {
    var coordinate = new BoardPosition(position);
    this.play(coordinate.getX(), coordinate.getY(), pieceUsed);
};

GameLogic.prototype.canPlayPosition = function (position) {
    var coordinate = new BoardPosition(position);
    return this.canPlay(coordinate.getX(), coordinate.getY());
};

GameLogic.prototype.placeWhitePiece = function (x, y) {
    if (this.board.whitePieces < this.maxWhitePieces)
        return false;

    this.board.placeWhitePiece(x, y);
    return true;
};

GameLogic.prototype.placeAllWhitePieces = function () {
    var placed = true;
    while (placed) {
        var freePosition = this.board.getRandomFreePosition();
        placed = this.board.placeWhitePiece(freePosition.getX(), freePosition.getY());
    }
};

GameLogic.prototype.play = function (x, y, pieceUsed) {
    if (!this.canPlay(x, y))
        throw new BoardCellOccupiedException();

    this.addLog(x, y, pieceUsed);
    this.board.placePiece(x, y);
};

GameLogic.prototype.canPlay = function (x, y) {
    return this.board.isEmpty(x, y)
};

GameLogic.prototype.addLog = function (x, y, pieceUsed) {
    this.playLog.push(this.board.getPieceAt(x, y), x, y, this.getCurrentPlayer(), pieceUsed, this.logic.getLastAnswer());
};

GameLogic.prototype.getCurrentPlayer = function () {
    return this.logic.getGameState()[3];
};

GameLogic.prototype.undo = function () {
    var lastPlayInfo = this.playLog.pop();
    this.logic.setLastAnswer(lastPlayInfo.lastAnswer);
    this.board.updateBoard();
    return lastPlayInfo;
};

GameLogic.prototype.getBoard = function () {
    return this.board.board;
};

GameLogic.prototype.logBoard = function () {
    var board = this.getBoard();
    var string = '';
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            string += board[i * 8 + j] + ' ';
        }
        string += '\n';
    }
    console.log(string);
};
