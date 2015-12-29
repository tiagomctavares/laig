function PickingObject(id, object) {
    this.id = id;
    this.object = object;
}

PickingObject.prototype.log = function () {
    console.log("Picked object: " + this.object + ", with pick id " + this.id);
};

PickingObject.prototype.belongsToPlayer = function () {
    return this.id > 100;
};

PickingObject.prototype.belongsToBoard = function () {
    return this.id > 0 && this.id < 100;
};