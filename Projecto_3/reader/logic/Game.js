function Game() {
    this.logic = new PrologInterface();
    this.board = new Board(this.logic);
    this.maxWhitePieces = 5;
    this.playLog = new PlayLog();
}

Game.prototype.placeWhitePiece = function (x, y) {
    if (this.board.whitePieces < this.maxWhitePieces)
        return false;

    this.board.placeWhitePiece(x, y);
    return true;
};

Game.prototype.placeAllWhitePieces = function () {
    var placed = true;
    while (placed) {
        var freePosition = this.board.getRandomFreePosition();
        placed = this.board.placeWhitePiece(freePosition.getX(), freePosition.getY());
    }
};

Game.prototype.play = function (x, y) {
    if (!this.canPlay(x, y))
        throw new BoardCellOccupiedException();

    this.addLog(x, y);
    this.board.placePiece(x, y);
};

Game.prototype.canPlay = function (x, y) {
    return this.board.isEmpty(x, y)
};

Game.prototype.addLog = function (x, y) {
    this.playLog.push(this.board.getPieceAt(x, y), x, y, this.getCurrentPlayer(), this.logic.getLastAnswer());
};

Game.prototype.getCurrentPlayer = function () {
    return this.logic.getGameState()[3];
};

Game.prototype.undo = function () {
    var lastPlayInfo = this.playLog.pop();
    this.logic.setLastAnswer(lastPlayInfo.lastAnswer);
    this.board.updateBoard();
    return lastPlayInfo;
};

Game.prototype.getBoard = function () {
    return this.board.board;
};

Game.prototype.logBoard = function () {
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
