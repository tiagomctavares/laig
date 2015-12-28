function PlayLog() {
    this.log = [];
}

PlayLog.prototype.push = function (lastPiece, x, y, player, lastAnswer) {
    this.log.push(new PlayLogStructure(lastPiece, x, y, player, lastAnswer));
};

PlayLog.prototype.pop = function () {
    return this.log.pop();
};

function PlayLogStructure(lastPiece, x, y, player, lastAnswer) {
    this.lastPiece = lastPiece;
    this.x = x;
    this.y = y;
    this.player = player;
    this.lastAnswer = lastAnswer;

    this.log();
}

PlayLogStructure.prototype.log = function () {
    console.log('-- history ---------------');
    console.log('AT ' + this.x + ',' + this.y + ' by ' + this.player + ' | Replaced: ' + this.lastPiece);
    console.log('--------------------------');
};