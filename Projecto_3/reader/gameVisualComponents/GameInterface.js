function GameInterface(scene, gameLogic, pickingHandler) {
    this.scene = scene;
    this.gameLogic = gameLogic;
    this.pickingHandler = pickingHandler;
    this.player1Points = 0;
    this.player2Points = 0;
    this.updateObjectsFromScratch();
}

GameInterface.prototype.initObjects = function () {
    //TABULEIRO DE JOGO
    this.boardCells = [];
    for (var i = 0; i < 64; i++) {
        this.boardCells[i] = new MyBoardCell(this.scene);
    }

    //PECAS DO JOGO
    this.player1Pieces = [];
    this.player2Pieces = [];
    this.player1ScorePieces = [];
    this.player2ScorePieces = [];
    this.whitePieces = [];

    for (var j = 0; j < 17; j++) {
        this.player1ScorePieces[j] = new MyScorePiece(this.scene, this.scene.pieceRed);
        this.player2ScorePieces[j] = new MyScorePiece(this.scene, this.scene.pieceBlue);
        this.player1Pieces[j] = new MyPiece(this.scene, this.scene.pieceRed);
        this.player2Pieces[j] = new MyPiece(this.scene, this.scene.pieceBlue);
    }

    for (var z = 0; z < 5; z++) {
        this.whitePieces[z] = new MyPiece(this.scene, this.scene.branco);
    }
};

GameInterface.prototype.animateObject = function (object, objectTo) {
    this.animatedObject = object;
    this.destinationObject = objectTo;
    this.animationPlaying = true;
    var firstPoint = object.getInitialPosition();
    var lastPoint = objectTo.getInitialPosition();

    this.animation = new LinearAnimation(1, 1, [
        firstPoint,
        [firstPoint[0], firstPoint[1], firstPoint[2]],
        [lastPoint[0], lastPoint[1], lastPoint[2]],
        objectTo.getInitialPosition()
    ]);
    this.animation.start();
    this.scene.pieceAnimation = this.animation;
};

GameInterface.prototype.updateObjectsFromScratch = function () {
    this.initObjects();
    var board = this.gameLogic.getBoard();

    for (var i = 0; i < board.length; i++) {
        var piece = null;
        if (board[i] == gameConstants.WHITE_PIECE) {
            piece = this.getFirstUnusedObject(this.whitePieces);
            this.boardCells[i].placeObject(piece);
            piece.used = true;
        } else if (board[i] == gameConstants.PLAYER1PIECE) {
            piece = this.getFirstUnusedObject(this.player1Pieces);
            this.boardCells[i].placeObject(piece);
            piece.used = true;
        } else if (board[i] == gameConstants.PLAYER2PIECE) {
            piece = this.getFirstUnusedObject(this.player2Pieces);
            this.boardCells[i].placeObject(piece);
            piece.used = true;
        }

        if (board[i] == gameConstants.PLAYER1SCORE) {
            piece = this.getFirstUnusedObject(this.player1ScorePieces);
            this.boardCells[i].placeObject(piece);
            piece.used = true;
        } else if (board[i] == gameConstants.PLAYER2SCORE) {
            piece = this.getFirstUnusedObject(this.player2ScorePieces);
            this.boardCells[i].placeObject(piece);
            piece.used = true;
        }
    }

    this.updateScoreClock();
};

GameInterface.prototype.updateScoreObjects = function () {
    var board = this.gameLogic.getBoard();

    this.updateScoreClock();

    this.whitePieces = [];
    for (var z = 0; z < 5; z++) {
        this.whitePieces[z] = new MyPiece(this.scene, this.scene.branco);
    }

    for (var i = 0; i < board.length; i++) {
        var piece = null;

        if (board[i] == gameConstants.PLAYER1SCORE) {
            piece = this.getFirstUnusedObject(this.player1ScorePieces);
            // Return last piece to owner
            if(this.boardCells[i].object != null)
                this.boardCells[i].object.used = false;
            this.boardCells[i].placeObject(piece);
            piece.used = true;
        } else if (board[i] == gameConstants.PLAYER2SCORE) {
            piece = this.getFirstUnusedObject(this.player2ScorePieces);
            // Return last piece to owner
            if(this.boardCells[i].object != null)
                this.boardCells[i].object.used = false;
            this.boardCells[i].placeObject(piece);
            piece.used = true;
        } else if(board[i] == gameConstants.WHITE_PIECE) {
            piece = this.getFirstUnusedObject(this.whitePieces);
            // Return last piece to owner
            if(this.boardCells[i].object != null)
                this.boardCells[i].object.used = false;
            this.boardCells[i].placeObject(piece);
            piece.used = true;
        }
    }
};

GameInterface.prototype.updateScoreClock = function () {
    var score = this.gameLogic.getCurrentScore();
    this.player1Points = score[0];
    this.player2Points = score[1];
};

GameInterface.prototype.display = function () {
    if (this.animationPlaying) {
        if (!this.animation.playing) {
            this.animatedObject.used = true;
            this.destinationObject.isOcuppied = true;
            this.destinationObject.placeObject(this.animatedObject);
            this.animationPlaying = false;
            this.scene.pieceAnimation = null;
            this.scene.setPickEnabled(true);

            this.updateScoreObjects();
        } else {
            this.scene.setPickEnabled(false);
        }
    }
    this.boardCellsDisplay();
    this.player1PiecesDisplay();
    this.player2PiecesDisplay();
    this.player1ScorePiecesDisplay();
    this.player2ScorePiecesDisplay();
    this.whitePiecesDisplay();
};

GameInterface.prototype.undoPlay = function () {
    var playLogStructure = this.gameLogic.undo();

    if (playLogStructure === undefined) {
        console.log('Can\t undo if there are no plays');
        return;
    }

    var position = playLogStructure.x * 8 + playLogStructure.y;

    this.boardCells[position].object.used = false;
    this.boardCells[position].removePiece();

    this.updateScoreClock();

    // TODO animate undo from boardCell to Origin Cell
    console.log('FINISHED UNDO');
};

GameInterface.prototype.boardCellsDisplay = function () {
    for (var i = 0; i < this.boardCells.length; i++) {
        this.scene.textYellow.apply();
        this.scene.pushMatrix();

        var x = 0.4 * (i % 8);
        var y = 0.4 * (~~(i / 8));
        this.scene.translate(x + 5.5, -0.2, y - 0.8);
        this.scene.scale(1.2, 1.0, 1.2);
        this.boardCells[i].setInitialPosition(x + 5.5, -0.2, y - 0.8);

        this.pickingHandler.addBoardCell(i, this.boardCells[i]);

        if (!this.boardCells[i].isOcuppied) {
            this.applyObjectSelectedOptions(this.boardCells[i]);
        }

        this.boardCells[i].display();

        // Object over Board cell
        if (this.boardCells[i].isOcuppied) {
            this.scene.translate(0, 0.1, 0);
            this.boardCells[i].object.defaultAppearance.apply();
            this.boardCells[i].object.display();
        }

        this.scene.popMatrix();
    }
};

GameInterface.prototype.player1PiecesDisplay = function () {
    for (var i = 0; i < this.player1Pieces.length; i++) {
        if (this.player1Pieces[i] === this.animatedObject) {
            this.scene.pushMatrix();
            this.scene.multMatrix(this.animation.matrix);
            this.player1Pieces[i].display();
            this.scene.popMatrix();
        }
        else if (!this.player1Pieces[i].used) {
            this.scene.pieceRed.apply();
            this.scene.pushMatrix();

            var z = 0.3 * (~~(i / 2));
            var x = 0.3 * (i % 2);
            this.scene.translate(x + 9.3, -0.3, z - 0.65);
            this.scene.scale(1.2, 1.0, 1.2);
            this.player1Pieces[i].setInitialPosition(x + 9.3, -0.3, z - 0.65);

            this.pickingHandler.addPlayer1Piece(i, this.player1Pieces[i]);
            this.applyObjectSelectedOptions(this.player1Pieces[i]);
            this.player1Pieces[i].display();

            this.scene.popMatrix();
        }
    }
};

GameInterface.prototype.player2PiecesDisplay = function () {
    for (var i = 0; i < this.player2Pieces.length; i++) {
        if (!this.player2Pieces[i].used) {
            this.scene.pieceBlue.apply();
            this.scene.pushMatrix();

            var z = 0.3 * (~~(i / 2));
            var x = 0.3 * (i % 2);
            this.scene.translate(x + 4.3, -0.3, z - 0.65);
            this.scene.scale(1.2, 1.0, 1.2);
            this.player2Pieces[i].setInitialPosition(x + 4.3, -0.3, z - 0.65);
            this.pickingHandler.addPlayer2Piece(i, this.player2Pieces[i]);

            this.player2Pieces[i].display();
            this.applyObjectSelectedOptions(this.player2Pieces[i]);
            this.player2Pieces[i].display();

            this.scene.popMatrix();
        }
    }
};

GameInterface.prototype.player1ScorePiecesDisplay = function () {
    for (var i = 0; i < this.player1ScorePieces.length; i++) {
        if (!this.player1ScorePieces[i].used) {
            this.scene.pieceRed.apply();
            this.scene.pushMatrix();

            var y = 0.01 * (~~(i));
            var x = 0.01 * (i % 1);
            this.scene.translate(x + 9.63, y - 0.3, 2.15);
            this.scene.scale(1.1, 1.0, 1.1);

            this.player1ScorePieces[i].display();

            this.scene.popMatrix();
        }
    }

};

GameInterface.prototype.player2ScorePiecesDisplay = function () {
    for (var i = 0; i < this.player2ScorePieces.length; i++) {
        if (!this.player2ScorePieces[i].used) {
            this.scene.pieceBlue.apply();
            this.scene.pushMatrix();

            var y = 0.01 * (~~(i));
            var x = 0.01 * (i % 1);
            this.scene.translate(x + 4.66, y - 0.3, 2.15);
            this.scene.scale(1.1, 1.0, 1.1);

            this.player2ScorePieces[i].display();
            this.scene.popMatrix();
        }
    }
};

GameInterface.prototype.whitePiecesDisplay = function () {

    for (var i = 0; i < this.whitePieces.length; i++) {
        if (!this.whitePieces[i].used) {
            this.scene.branco.apply();
            this.scene.pushMatrix();
            var x = 0.4 * (~~(i));
            var y = 0.4 * (i % 1);
            this.scene.translate(x + 6.05, y, 2.7);
            this.scene.scale(1.2, 1.0, 1.2);

            // this.pickingHandler.addWhitePiece(i, this.whitePieces[i]);

            /*if (this.piecesBrancas[i].isSelected()) {
             this.cinza.apply();
             this.piecesBrancas[i].display();
             this.branco.apply();
             } else {
             this.piecesBrancas[i].display();
             }
             */
            this.whitePieces[i].display();

            this.scene.popMatrix();
        }
    }
};

GameInterface.prototype.applyObjectSelectedOptions = function (object) {
    if (object.isSelected()) {
        this.scene.textGreen.apply();
    }
};

GameInterface.prototype.getFirstUnusedObject = function (arrayObjects) {
    return arrayObjects.filter(function (el) {
        return el.used == false;
    })[0];
};