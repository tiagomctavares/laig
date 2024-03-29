/**
 * MyScorePiece
 * @constructor
 */
function MyScorePiece(scene, appearance) {
    CGFobject.call(this, scene);

    this.cubeQuad = new MyUnitCubeQuad(this.scene);
    this.cubeQuad.initBuffers();
    this.applyObjectSelectedOptions = false;

    this.used = false;
    this.defaultAppearance = appearance;
}

MyScorePiece.prototype = Object.create(CGFobject.prototype);
MyScorePiece.prototype.constructor = MyScorePiece;

MyScorePiece.prototype.select = function () {
    this.applyObjectSelectedOptions = true;
};

MyScorePiece.prototype.clear = function () {
    this.applyObjectSelectedOptions = false;
};

MyScorePiece.prototype.isSelected = function () {
    return this.applyObjectSelectedOptions;
};
MyScorePiece.prototype.display = function () {

    //Peça de pontuação
    this.scene.pushMatrix();
    this.scene.translate(0.20, 3.0, 3.7);
    this.scene.scale(0.3, 0.07, 0.3);
    this.cubeQuad.display();
    this.scene.popMatrix();

};
