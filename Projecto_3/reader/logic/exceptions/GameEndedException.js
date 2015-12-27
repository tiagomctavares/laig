function GameEndedException(response) {
    var results = response.split(',');
    this.player = results[0].substr(1);
    this.reason = results[1].substr(0, results[1].length-1);
}

GameEndedException.prototype.toString = function () {
    return this.getPlayer() + ' (' + this.getReason() + ')';
};

GameEndedException.prototype.getPlayer = function () {
    return this.player;
};

GameEndedException.prototype.getReason = function () {
    return this.reason;
};
