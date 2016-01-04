function PlayLog() {
    this.log = [];
}

PlayLog.prototype.push = function (lastPiece, x, y, player, pieceUsed, lastAnswer) {
    this.log.push(new PlayLogStructure(lastPiece, x, y, player, pieceUsed, lastAnswer));
};

PlayLog.prototype.pop = function () {
    return this.log.pop();
};

PlayLog.prototype.isEmpty = function () {
    return this.log.length == 0;
};

function PlayLogStructure(lastPiece, x, y, player, pieceUsed, lastAnswer) {
    this.lastPiece = lastPiece;
    this.x = x;
    this.y = y;
    this.player = player;
    this.pieceUsed = pieceUsed;
    this.lastAnswer = lastAnswer;

    this.log();
}

PlayLogStructure.prototype.log = function () {
    console.log('-- history ---------------');
    console.log('AT ' + this.x + ',' + this.y + ' by ' + this.player + ' with: ' + this.pieceUsed.id + ' | Replaced: ' + this.lastPiece);
    console.log('--------------------------');
};