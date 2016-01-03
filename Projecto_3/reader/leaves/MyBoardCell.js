/**
 * MyScorePiece
 * @constructor
 */
function MyBoardCell(scene) {
    CGFobject.call(this, scene);

    this.cubeQuad = new MyUnitCubeQuad(this.scene);
    this.cubeQuad.initBuffers();
    this.applyObjectSelectedOptions = false;

    this.isOcuppied = false;
    this.object = null;
    this.initialPosition = [];
}

MyBoardCell.prototype = Object.create(CGFobject.prototype);
MyBoardCell.prototype.constructor = MyScorePiece;

MyBoardCell.prototype.select = function () {
    this.applyObjectSelectedOptions = true;
};

MyBoardCell.prototype.clear = function () {
    this.applyObjectSelectedOptions = false;
};

MyBoardCell.prototype.isSelected = function () {
    return this.applyObjectSelectedOptions;
};

MyBoardCell.prototype.display = function () {
    //Peça de pontuação
    this.scene.pushMatrix();
    this.scene.translate(0.20, 3.0, 3.7);
    this.scene.scale(0.3, 0.07, 0.3);
    this.cubeQuad.display();
    this.scene.popMatrix();
};

MyBoardCell.prototype.placeObject = function (object) {
    this.isOcuppied = true;
    this.object = object;
};

MyBoardCell.prototype.getInitialPosition = function () {
    return this.initialPosition;
};

MyBoardCell.prototype.setInitialPosition = function (x, y, z) {
    this.initialPosition = [];
    this.initialPosition.push(x);
    this.initialPosition.push(y);
    this.initialPosition.push(z);
};