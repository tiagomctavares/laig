/**
 * MyPiece
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyPiece(scene, appearance) {
    CGFobject.call(this, scene);

    this.cubeQuad = new MyUnitCubeQuad(this.scene);
    this.cubeQuad.initBuffers();
    this.applyObjectSelectedOptions = false;

    this.used = false;
    this.initialPosition = [];
    this.defaultAppearance = appearance;
    this.hasAnimation = false;
    this.animation = null;
};

MyPiece.prototype = Object.create(CGFobject.prototype);
MyPiece.prototype.constructor = MyPiece;

MyPiece.prototype.select = function () {
    this.applyObjectSelectedOptions = true;
}

MyPiece.prototype.clear = function () {
    this.applyObjectSelectedOptions = false;
}

MyPiece.prototype.isSelected = function () {
    return this.applyObjectSelectedOptions;
};

MyPiece.prototype.display = function () {
    this.scene.pushMatrix();

    if (this.hasAnimation) {
        if (!this.animation.playing) {
            this.hasAnimation = false;
        } else {
            this.animation.update();
        }
    }

    //Peça de jogo X
    this.scene.pushMatrix();
    this.scene.translate(0.20, 3.0, 3.7);
    this.scene.rotate(45 * degToRad, 0, 1, 0);
    this.scene.scale(0.05, 0.07, 0.35);
    this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.20, 3.0, 3.7);
    this.scene.rotate(-45 * degToRad, 0, 1, 0);
    this.scene.scale(0.05, 0.07, 0.35);
    this.cubeQuad.display();
    this.scene.popMatrix();

    this.scene.popMatrix();

};

MyPiece.prototype.getInitialPosition = function () {
    return this.initialPosition;
};

MyPiece.prototype.setInitialPosition = function (x, y, z) {
    this.initialPosition = [];
    this.initialPosition.push(x);
    this.initialPosition.push(y);
    this.initialPosition.push(z);
};