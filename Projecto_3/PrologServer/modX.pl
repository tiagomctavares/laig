:- use_module(library(random)).
:- use_module(library(system)).

:-include('menu.pl').
:-include('tabuleiro.pl').
:-include('gameProperties.pl').
:-include('util.pl').
:-include('prologPlays.pl').


%condição de paragem 1: - o jogador nao tem mais peças
playGame(Game):-
        assertPieces(Game,'player1X'),
        write('PLAYER GANHOU O JOGO!').

playGame(Game):-
        assertPieces(Game,'CPU2X'),
        write('CPU GANHOU O JOGO!').

%condição de paragem 2: - o jogador chegou ao limite de pontos estabelecido
playGame(Game):-
        checkScorePlayer(Game),
        write('PLAYER GANHOU O JOGO!').

playGame(Game):-
        checkScoreCPU(Game),
        write('CPU GANHOU O JOGO!').

%jogador joga
playGame(Game):-
        getGamePlayerTurn(Game, Player),
        Player == playerTurn,
        letHumanPlay(Game,Game2),
        evaluatePlay(Game2,Game3),
        assertScores(Game3,Game4),
        assertMarkers(Game4,Game5),
        assertWhitePieces(Game5,Game6),
        printInformation(Game6),
        setGamePlayerTurn(cpuTurn,Game6,Game7),
        playGame(Game7).

%prolog joga
playGame(Game):-
        getGamePlayerTurn(Game, Player),
        Player == cpuTurn,
        prologPlayGreedy(Game,Game2),
        evaluatePlay(Game2,Game3),
        assertScores(Game3,Game4),
        assertMarkers(Game4,Game5),
        assertWhitePieces(Game5,Game6),
        printInformation(Game6),
        setGamePlayerTurn(playerTurn,Game6,Game7),
        playGame(Game7).


%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%

playGameRandomBot(Game):-
        assertPieces(Game,'player1X'),
        write('PLAYER GANHOU O JOGO!').

playGameRandomBot(Game):-
        assertPieces(Game,'CPU2X'),
        write('CPU GANHOU O JOGO!').

%condição de paragem 2: - o jogador chegou ao limite de pontos estabelecido
playGameRandomBot(Game):-
        checkScorePlayer(Game),
        write('PLAYER GANHOU O JOGO!').

playGameRandomBot(Game):-
        checkScoreCPU(Game),
        write('CPU GANHOU O JOGO!').

playGameRandomBot(Game):-
        getGamePlayerTurn(Game, Player),
        Player == playerTurn,
        letHumanPlay(Game,Game2),
        evaluatePlay(Game2,Game3),
        assertScores(Game3,Game4),
        assertMarkers(Game4,Game5),
        assertWhitePieces(Game5,Game6),
        printInformation(Game6),
        setGamePlayerTurn(cpuTurn,Game6,Game7),
        playGameRandomBot(Game7).

playGameRandomBot(Game):-
        getGamePlayerTurn(Game, Player),
        Player == cpuTurn,
        prologPlays(Game,Game2),
        evaluatePlay(Game2,Game3),
        assertScores(Game3,Game4),
        assertMarkers(Game4,Game5),
        assertWhitePieces(Game5,Game6),
        printInformation(Game6),
        setGamePlayerTurn(playerTurn,Game6,Game7),
        playGameRandomBot(Game7).


%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%

playGameGreedyBot(Game):-
        assertPieces(Game,'player1X'),
        write('PLAYER GANHOU O JOGO!').

playGameGreedyBot(Game):-
        assertPieces(Game,'CPU2X'),
        write('CPU GANHOU O JOGO!').

%condição de paragem 2: - o jogador chegou ao limite de pontos estabelecido
playGameGreedyBot(Game):-
        checkScorePlayer(Game),
        write('PLAYER GANHOU O JOGO!').

playGameGreedyBot(Game):-
        checkScoreCPU(Game),
        write('CPU GANHOU O JOGO!').

playGameGreedyBot(Game):-
        getGamePlayerTurn(Game, Player),
        Player == playerTurn,
        letHumanPlay(Game,Game2),
        evaluatePlay(Game2,Game3),
        assertScores(Game3,Game4),
        assertMarkers(Game4,Game5),
        assertWhitePieces(Game5,Game6),
        printInformation(Game6),
        setGamePlayerTurn(cpuTurn,Game6,Game7),
        playGameGreedyBot(Game7).

playGameGreedyBot(Game):-
        getGamePlayerTurn(Game, Player),
        Player == cpuTurn,
        prologPlaysTrueGreedy(Game,Game2),
        evaluatePlay(Game2,Game3),
        assertScores(Game3,Game4),
        assertMarkers(Game4,Game5),
        assertWhitePieces(Game5,Game6),
        printInformation(Game6),
        setGamePlayerTurn(playerTurn,Game6,Game7),
        playGameGreedyBot(Game7).


%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%

playGameExploiterBot(Game):-
        assertPieces(Game,'player1X'),
        write('PLAYER GANHOU O JOGO!').

playGameExploiterBot(Game):-
        assertPieces(Game,'CPU2X'),
        write('CPU GANHOU O JOGO!').

%condição de paragem 2: - o jogador chegou ao limite de pontos estabelecido
playGameExploiterBot(Game):-
        checkScorePlayer(Game),
        write('PLAYER GANHOU O JOGO!').

playGameExploiterBot(Game):-
        checkScoreCPU(Game),
        write('CPU GANHOU O JOGO!').

playGameExploiterBot(Game):-
        getGamePlayerTurn(Game, Player),
        Player == playerTurn,
        letHumanPlay(Game,Game2),
        evaluatePlay(Game2,Game3),
        assertScores(Game3,Game4),
        assertMarkers(Game4,Game5),
        assertWhitePieces(Game5,Game6),
        printInformation(Game6),
        setGamePlayerTurn(cpuTurn,Game6,Game7),
        playGameExploiterBot(Game7).

playGameExploiterBot(Game):-
        getGamePlayerTurn(Game, Player),
        Player == cpuTurn,
        prologExploits(Game,Game2),
        evaluatePlay(Game2,Game3),
        assertScores(Game3,Game4),
        assertMarkers(Game4,Game5),
        assertWhitePieces(Game5,Game6),
        printInformation(Game6),
        setGamePlayerTurn(playerTurn,Game6,Game7),
        playGameExploiterBot(Game7).


%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%

playGameExploiterAgressiveBot(Game):-
        assertPieces(Game,'player1X'),
        write('CPU GANHOU O JOGO!').

playGameExploiterAgressiveBot(Game):-
        assertPieces(Game,'CPU2X'),
        write('Player GANHOU O JOGO!').

%condição de paragem 2: - o jogador chegou ao limite de pontos estabelecido
playGameExploiterAgressiveBot(Game):-
        checkScorePlayer(Game),
        write('PLAYER GANHOU O JOGO!').

playGameExploiterAgressiveBot(Game):-
        checkScoreCPU(Game),
        write('CPU GANHOU O JOGO!').

playGameExploiterAgressiveBot(Game):-
        getGamePlayerTurn(Game, Player),
        Player == playerTurn,
        letHumanPlay(Game,Game2),
        evaluatePlay(Game2,Game3),
        assertScores(Game3,Game4),
        assertMarkers(Game4,Game5),
        assertWhitePieces(Game5,Game6),
        printInformation(Game6),
        setGamePlayerTurn(cpuTurn,Game6,Game7),
        playGameExploiterAgressiveBot(Game7).

playGameExploiterAgressiveBot(Game):-
        getGamePlayerTurn(Game, Player),
        Player == cpuTurn,
        prologExploitsAndAgressive(Game,Game2),
        evaluatePlay(Game2,Game3),
        assertScores(Game3,Game4),
        assertMarkers(Game4,Game5),
        assertWhitePieces(Game5,Game6),
        printInformation(Game6),
        setGamePlayerTurn(playerTurn,Game6,Game7),
        playGameExploiterAgressiveBot(Game7).


%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%

playGamePvP(Game):-
        assertPieces(Game,'player1X'),
        write('Player 2 GANHOU O JOGO!').

playGamePvP(Game):-
        assertPieces(Game,'CPU2X'),
        write('Player 1 GANHOU O JOGO!').

%condição de paragem 2: - o jogador chegou ao limite de pontos estabelecido
playGamePvP(Game):-
        checkScorePlayer(Game),
        write('PLAYER 1 GANHOU O JOGO!').

playGamePvP(Game):-
        checkScoreCPU(Game),
        write('Player 2 GANHOU O JOGO!').

playGamePvP(Game):-
        getGamePlayerTurn(Game, Player),
        Player == playerTurn,
        letHumanPlay(Game,Game2),
        evaluatePlay(Game2,Game3),
        assertScores(Game3,Game4),
        assertMarkers(Game4,Game5),
        assertWhitePieces(Game5,Game6),
        printInformationPvP(Game6),
        setGamePlayerTurn(cpuTurn,Game6,Game7),
        playGamePvP(Game7).

playGamePvP(Game):-
        getGamePlayerTurn(Game, Player),
        Player == cpuTurn,
        letPlayer2Play(Game,Game2),
        evaluatePlay(Game2,Game3),
        assertScores(Game3,Game4),
        assertMarkers(Game4,Game5),
        assertWhitePieces(Game5,Game6),
        printInformationPvP(Game6),
        setGamePlayerTurn(playerTurn,Game6,Game7),
        playGamePvP(Game7).


%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%



assertMarkers(Game,ResultantGame):-
        
        getGameBoard(Game,Board),
        
        accountPlayerX(Board,0,RetX),
        accountCPUX(Board,0,RetCPU),

        XNumber is 18 - RetX,
        CPUXNumber is 18 - RetCPU,

        setGameNumCPUX(CPUXNumber,Game,TempGame),
        setGameNumPlayerX(XNumber,TempGame,TempGame2),
        
        ResultantGame = TempGame2.



assertWhitePieces(Game,ResultantGame):-
        getGameBoard(Game,Board),
        
        accountWhitePieces(Board,0,Return),
                
        prologPlaceWhitePiece(Return,Game, ResultingGame),
        
        ResultantGame = ResultingGame.
        

printInformation(Game):-
        getGameBoard(Game,Board),
        write('=====PIECES====='),nl,
        write('==PLAYER1: '),
        getGameNumPlayerX(Game,PlayerX),
        write(PlayerX),write('==='),nl,
        write('=====CPU: '),
        getGameNumCPUX(Game,CPUX),
        write(CPUX),write('==='),nl,
        write('=====SCORES====='),nl,
        write('==PLAYER1: '),
        getGameNumPlayerSQ(Game,PlayerScore),
        write(PlayerScore),write('==='),nl,
        write('=====CPU: '),
        getGameNumCPUSQ(Game,CPUScore),
        write(CPUScore),write('==='),nl,
        imprimeBoard(Board),nl.

printInformationPvP(Game):-
        getGameBoard(Game,Board),
        write('=====PIECES====='),nl,
        write('==PLAYER1: '),
        getGameNumPlayerX(Game,PlayerX),
        write(PlayerX),write('==='),nl,
        write('==PLAYER2: '),
        getGameNumCPUX(Game,CPUX),
        write(CPUX),write('==='),nl,
        write('=====SCORES====='),nl,
        write('==PLAYER1: '),
        getGameNumPlayerSQ(Game,PlayerScore),
        write(PlayerScore),write('==='),nl,
        write('==PLAYER2: '),
        getGameNumCPUSQ(Game,CPUScore),
        write(CPUScore),write('==='),nl,
        imprimeBoard(Board),nl.
        

checkScorePlayer(Game):-
        getGameNumPlayerSQ(Game,Ret),
        Ret >= 12.

checkScoreCPU(Game):-
        getGameNumCPUSQ(Game,Ret),
        Ret >= 12.

assertPieces(Game, ElemToBeChecked):-
        ElemToBeChecked == 'player1X',
        getGameNumPlayerX(Game, Ret),
        Ret == 0.

assertPieces(Game, ElemToBeChecked):-
        ElemToBeChecked == 'CPU2X',
        getGameNumCPUX(Game, Ret),
        Ret == 0.
     
assertScores(Game,ResultantGame):-
        getGameBoard(Game,Board),
        
        findPiece(Board,0,0,RetPlayer,RetCPU),

        setGameNumPlayerSQ(RetPlayer,Game,ResultingGame1),
        setGameNumCPUSQ(RetCPU,ResultingGame1,ResultingGame2),
        
        ResultantGame = ResultingGame2.

assertScores(Game,ResultantGame):-
        getGameBoard(Game,Board),
        setGameBoard(Board,Game,TempGame),
        ResultantGame = TempGame, nl.


createNewGame(Game):-
        initialBoard(Board),
        Game = [Board, [18, 18], [0,0], playerTurn], !.


evaluatePlay(Game, ResultantGame):-
        getGameBoard(Game,Board),
        
        navigateMatrix(Board,0,_,Board,ResultingBoard),
        
        setGameBoard(ResultingBoard, Game, TempGame),
        
        ResultantGame = TempGame.

evaluatePlay(Game,ResultantGame):-
        
        getGameBoard(Game,Board),
        
        setGameBoard(Board,Game,TempGame),
        
        ResultantGame = TempGame.
        
        

humanPlaceX(Game,ResultantGame):-
        
        getGameBoard(Game,Board),
        
        imprimeBoard(Board),nl,
        
        write('Peca 1: '),
        getPieceToBeInsertedDestinyCoords(DestRow1,DestCol1),
        write('Peca 2: '),
        getPieceToBeInsertedDestinyCoords(DestRow2,DestCol2),
        write('Peca 3: '),
        getPieceToBeInsertedDestinyCoords(DestRow3,DestCol3),
        write('Peca 4: '),
        getPieceToBeInsertedDestinyCoords(DestRow4,DestCol4),
        write('Peca 5: '),
        getPieceToBeInsertedDestinyCoords(DestRow5,DestCol5),
        
        setMatrixElemAtWith(DestRow1,DestCol1,'whitePiece',Board,ResultantBoard),

        setMatrixElemAtWith(DestRow2,DestCol2,'whitePiece',ResultantBoard,ResultantBoard2),

        setMatrixElemAtWith(DestRow3,DestCol3,'whitePiece',ResultantBoard2,ResultantBoard3),

        setMatrixElemAtWith(DestRow4,DestCol4,'whitePiece',ResultantBoard3,ResultantBoard4),

        setMatrixElemAtWith(DestRow5,DestCol5,'whitePiece',ResultantBoard4,ResultantBoard5),
        
        setGameBoard(ResultantBoard5,Game,TempGame),
        
        imprimeBoard(ResultantBoard5),
        
        ResultantGame = TempGame.
        

letHumanPlay(Game, ResultantGame):-
        getGameBoard(Game, Board),

        write('<Player 1> TURN'),nl,
        repeat,
        
        getPieceToBeInsertedDestinyCoords(DestRow, DestCol),
        
        isOccupied(DestRow,DestCol,Board,RetElem),
        setMatrixElemAtWith(DestRow, DestCol,RetElem, Board, ResultantBoard),
        setGameBoard(ResultantBoard, Game, TempGame),
        
        ResultantGame = TempGame, !.



letPlayer2Play(Game, ResultantGame):-
        getGameBoard(Game, Board),
        
        write('<Player 2> TURN'),nl,
        repeat,
        
        getPieceToBeInsertedDestinyCoords(DestRow, DestCol),
        
        isOccupiedPlayer2(DestRow,DestCol,Board,RetElem),
        setMatrixElemAtWith(DestRow, DestCol,RetElem, Board, ResultantBoard),
        setGameBoard(ResultantBoard, Game, TempGame),
        
        ResultantGame = TempGame, !.




isOccupied(Dr,Dc,Board,RetElem):-
        getMatrixElemAt(Dr,Dc,Board,Elem),
        Elem == 'free',
        RetElem = 'player1X'.

isOccupied(Dr,Dc,Board,RetElem):-
        getMatrixElemAt(Dr,Dc,Board,Elem),
        Elem == 'CPUsquare',
        RetElem = 'squareCPUOverlap'.

isOccupiedPlayer2(Dr,Dc,Board,RetElem):-
        getMatrixElemAt(Dr,Dc,Board,Elem),
        Elem == 'free',
        RetElem = 'CPU2X'.

isOccupiedPlayer2(Dr,Dc,Board,RetElem):-
        getMatrixElemAt(Dr,Dc,Board,Elem),
        Elem == 'CPUsquare',
        RetElem = 'squarePlayerOverlap'.        
        

getPieceToBeInsertedDestinyCoords(Row, Col):-
        write('Please insert the coordinates where to place your marker.'), nl,
        inputCoords(Row, Col), nl.      


inputCoords(RowNo, ColNo):-
        
        write('[ROW]: '),
        scanInt(SrcRow),
        
        discardInputChar,
        write('[COL]: '),
        scanInt(SrcCol),
        
        discardInputChar,

        RowNo is SrcRow-1,
        ColNo is SrcCol-1.

