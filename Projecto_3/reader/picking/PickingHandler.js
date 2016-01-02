function PickingHandler(scene, gameLogic) {
    this.scene = scene;
    this.gameLogic = gameLogic;

    this.boardCells = [];
    this.boardOffset = 1;
    this.player1Offset = 101;
    this.player2Offset = 201;
	this.whitePieces = 301;
    this.lastPickedObject = new PickingObject(0, {});

    this.scene.setPickEnabled(true);
}

PickingHandler.prototype.clearObjects = function () {
    this.scene.clearPickRegistration();
};

PickingHandler.prototype.addBoardCell = function (id, object) {
    this.boardCells.push(new PickingObject(this.boardOffset + id, object));
    this.scene.registerForPick(this.boardOffset + id, object);
};

PickingHandler.prototype.addPlayer1Piece = function (id, object) {
    this.boardCells.push(new PickingObject(this.player1Offset + id, object));
    this.scene.registerForPick(this.player1Offset + id, object);
};

PickingHandler.prototype.addPlayer2Piece = function (id, object) {
    this.boardCells.push(new PickingObject(this.player2Offset + id, object));
    this.scene.registerForPick(this.player2Offset + id, object);
};

PickingHandler.prototype.addWhitePiece = function (id, object) {
    this.boardCells.push(new PickingObject(this.whitePieces + id, object));
    this.scene.registerForPick(this.whitePieces + id, object);
};

PickingHandler.prototype.handle = function () {
    if (!this.hasPickedResults())
        return;

    var results = this.loadPickedResults();
    for (var i = 0; i < results.length; i++) {
        console.log(this.lastPickedObject);

        if (this.availablePlayerPieceToBoard(results[i])) {
            if (this.gameLogic.canPlayPosition(results[i].id - 1)) {
                console.log('Played Piece: ');
                console.log(results[i].object);
                this.gameLogic.playPosition(results[i].id - 1, this.lastPickedObject);
                this.gameLogic.logBoard();
                this.scene.gameInterface.updateObjects();
            }
        }
    }

    if (results[i - 1] === undefined)
        this.lastPickedObject = new PickingObject(0, {});
    else
        this.lastPickedObject = results[i - 1];
};

PickingHandler.prototype.availablePlayerPieceToBoard = function (piece) {
    return this.lastPickedObject.belongsToPlayer() && piece.belongsToBoard();
};

PickingHandler.prototype.loadPickedResults = function () {
    var pickingObjects = [];
    var results = this.scene.pickResults;
    for (var i = 0; i < results.length; i++) {
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
