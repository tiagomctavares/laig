function PrologLogic() {
    this.request = new Request();
    this.start();
}

PrologLogic.prototype.parseGame = function (prologResponse) {
    this.gameStateResponse = prologResponse;
    this.gameState = JSON.parse(this.replaceConstants(prologResponse));
    this.board = this.gameState[0];
    this.piecesAvailable = this.gameState[1];
    this.scores = this.gameState[2];
    this.currentTurn = this.gameState[3];

    return this;
};

PrologLogic.prototype.getGame = function () {
    return this.gameState;
};

PrologLogic.prototype.replaceConstants = function (prologResponse) {
    var find = prologConfig.gameStateConstants;
    for (var i = 0; i < find.length; i++) {
        var re = new RegExp(find[i], 'g');
        prologResponse = prologResponse.replace(re, '"' + find[i] + '"');
    }

    return prologResponse;
};

PrologLogic.prototype.start = function () {
    return this.makeRequest('start');
};

PrologLogic.prototype.placeWhitePiece = function (x, y) {
    return this.makeRequest('placeX', {
        x: x,
        y: y,
        game: this.gameStateResponse
    });
};

PrologLogic.prototype.makeRequest = function (prologAction, data) {
    return this.parseGame(this.request.get(prologAction, data)).getGame();
};