function PickingObject(id, object) {
    this.id = id;
    this.object = object;
}

PickingObject.prototype.log = function () {
    console.log("Picked object: " + this.object + ", with pick id " + this.id);
};

PickingObject.prototype.belongsToPlayer = function (player) {
    if (player === undefined)
        return this.id > 100 && this.id < 300;

    if (player == gameConstants.PLAYER1TURN) {
        return this.id > 100 && this.id < 200;
    }

    if (player == gameConstants.PLAYER2TURN) {
        return this.id > 200 && this.id < 300;
    }
};

PickingObject.prototype.belongsToBoard = function () {
    return this.id > 0 && this.id < 100;
};

PickingObject.prototype.isOcuppied = function () {
    return this.object.isOcuppied;
};