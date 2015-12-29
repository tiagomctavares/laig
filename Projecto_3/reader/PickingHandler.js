function PickingHandler(scene) {
    this.scene = scene;
    this.objects = [];
    this.boardOffset = 1;
    this.player1Offset = 101;
    this.player2Offset = 201;

    this.scene.setPickEnabled(true);
}

PickingHandler.prototype.clearObjects = function () {
    this.scene.clearPickRegistration();
};

PickingHandler.prototype.addBoardCell = function (id, object) {
    this.objects.push(new PickingObject(id, object));
    this.scene.registerForPick(id + this.boardOffset, object);
};

PickingHandler.prototype.addPlayer1Piece = function (id, object) {
    this.objects.push(new PickingObject(this.player1Offset + id, object));
    this.scene.registerForPick(id, object);
};

PickingHandler.prototype.addPlayer2Piece = function (id, object) {
    this.objects.push(new PickingObject(this.player2Offset + id, object));
    this.scene.registerForPick(id, object);
};

PickingHandler.prototype.handle = function () {
    this.log();
};

//PICKING
PickingHandler.prototype.log = function () {
    if (this.hasPickedResults()) {
        var results = this.loadPickedResults();
        for (var i = 0; i < results.length; i++) {
            console.log("Picked object: " + results[i].object + ", with pick id " + results[i].id);
        }
    }
};

PickingHandler.prototype.loadPickedResults = function () {
    var pickingObjects = [];
    var results = this.scene.pickResults;
    for(var i = 0; i < results.length; i++) {
        var obj = results[i][0];
        var id = this.scene.pickResults[i][1];
        if (obj) {
            pickingObjects.push(new PickingObject(id, obj));
            this.scene.clearSelection();
            this.scene.select(obj);
        }
    }
    this.scene.pickResults.splice(0, this.scene.pickResults.length);

    return pickingObjects;
};

PickingHandler.prototype.hasPickedResults = function () {
    return (
        this.scene.pickMode == false
        && this.scene.pickResults != null
        && this.scene.pickResults.length > 0
    );
};

function PickingObject(id, object) {
    this.id = id;
    this.object = object;
}