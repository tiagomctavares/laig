function PickingHandler(scene) {
    this.scene = scene;
    this.objects = [];
    this.boardOffset = 1;
    this.player1Offset = 101;
    this.player2Offset = 201;

    this.scene.setPickEnabled(true);
}

PickingHandler.prototype.clearObjects = function() {
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

//PICKING
PickingHandler.prototype.log = function ()
{
    if (this.scene.pickMode == false) {
        if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
            for (var i=0; i< this.scene.pickResults.length; i++) {
                var obj = this.scene.pickResults[i][0];
                if (obj)
                {
                    var customId = this.scene.pickResults[i][1];
                    console.log("Picked object: " + obj + ", with pick id " + customId);
                    this.scene.clearSelection();
                    this.scene.select(this.scene.pickResults[i][0]);
                }
            }
            this.scene.pickResults.splice(0,this.scene.pickResults.length);
        }
    }
}

function PickingObject(id, object) {
    this.id = id;
    this.object = object;
}