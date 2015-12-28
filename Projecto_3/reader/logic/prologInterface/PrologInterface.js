function PrologInterface() {
    this.request = new Request();
    this.start();
}

PrologInterface.prototype.parseGame = function (prologResponse) {
    this.gameStateResponse = this.specialConstants(prologResponse);
    this.gameState = JSON.parse(this.replaceConstants(prologResponse));

    return this;
};

PrologInterface.prototype.getLastAnswer = function () {
    return this.lastAnswer;
};

PrologInterface.prototype.setLastAnswer = function (lastAnswer) {
    this.lastAnswer = lastAnswer;
    this.parseGame(lastAnswer);
};

PrologInterface.prototype.getGameState = function () {
    return this.gameState;
};

PrologInterface.prototype.makeRequest = function (prologAction, data, dontParse) {
    this.lastAnswer = this.request.get(prologAction, data);
    if (dontParse === undefined)
        return this.parseGame(this.lastAnswer);

    return this;
};

PrologInterface.prototype.replaceConstants = function (prologResponse) {
    var find = prologConfig.gameStateConstants;
    for (var i = 0; i < find.length; i++) {
        var re = new RegExp(find[i], 'g');
        prologResponse = prologResponse.replace(re, '"' + find[i] + '"');
    }

    return prologResponse;
};

PrologInterface.prototype.specialConstants = function (prologResponse) {
    var find = Object.keys(prologConfig.prologSpecialConstants);
    for (var i = 0; i < find.length; i++) {
        var re = new RegExp(find[i], 'g');
        prologResponse = prologResponse.replace(re, prologConfig.prologSpecialConstants[find[i]]);
    }

    return prologResponse;
};

PrologInterface.prototype.start = function () {
    return this.makeRequest('start');
};

PrologInterface.prototype.placeWhitePiece = function (x, y) {
    return this.makeRequest('placeX', {
        x: x,
        y: y,
        game: this.gameStateResponse
    });
};

PrologInterface.prototype.play = function (x, y) {
    return this.makeRequest('playerPlay', {
        x: x,
        y: y,
        game: this.gameStateResponse
    }).checkEndGame();
};

PrologInterface.prototype.checkEndGame = function () {

    this.makeRequest('endGame', {
        game: this.gameStateResponse
    }, false);

    if(this.lastAnswer !== '[]') {
        throw new GameEndedException(this.lastAnswer);
    }

    return this;
};