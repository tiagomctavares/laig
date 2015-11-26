getGameBoard([Board|_], Board).

setgameboard(Board, Game, ResultantGame):-
        setListElemAtWith(0, Board, Game, ResultantGame).
        

        
setGameNumPiecesList(NumPiecesList, Game, ResultantGame):-
	setListElemAtWith(1, NumPiecesList, Game, ResultantGame).
        
setGameNumSquaresList(NumPiecesList, Game, ResultantGame):-
        setListElemAtWith(2, NumPiecesList, Game, ResultantGame).
        
getGameNumCrossesList(Game, NumPiecesList):-
	getListElemAt(1, Game, NumPiecesList).
	
getGameNumSquaresList(Game, NumPiecesList):-
	getListElemAt(2, Game, NumPiecesList).
        


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% CPU %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%% PECAS DE MARCACAO

getGameNumCPUX(Game, NumCPUX):-
	getGameNumCrossesList(Game, NumPiecesList),
	getListElemAt(1, NumPiecesList, NumCPUX).

decNumCPUX(Game, ResultantGame):-
	getGameNumCPUX(Game, NumCPUX),
	NumCPUX1 is NumCPUX - 1,
	setGameNumCPUX(NumCPUX1, Game, ResultantGame).
	
incNumCPUX(Game, ResultantGame):-
	getGameNumPlayerX(Game, NumCPUX),
	NumCPUX1 is NumCPUX + 1,
	setGameNumCPUX(NumCPUX1, Game, ResultantGame).
	
addNumCPUX(Game, ResultantGame, Value):-
	getGameNumPlayerX(Game, CPUX),
	CPUX1 is CPUX + Value,
	setGameNumCPUX(CPUX1, Game, ResultantGame).
	
setGameNumCPUX(NumCPUX, Game, ResultantGame):-
	getGameNumCrossesList(Game, NumPiecesList),
	setListElemAtWith(1, NumCPUX, NumPiecesList, ResNumPiecesList),
	setGameNumPiecesList(ResNumPiecesList, Game, ResultantGame).
	
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% PECAS DE PONTUACAO %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 

getGameNumCPUSQ(Game, NumCPUSQ):-
	getGameNumSquaresList(Game, NumPiecesList),
	getListElemAt(1, NumPiecesList, NumCPUSQ).

decNumCPUSQ(Game, ResultantGame):-
	getGameNumCPUSQ(Game, NumCPUSQ),
	NumCPUSQ1 is NumCPUSQ - 1,
	setGameNumCPUX(NumCPUSQ1, Game, ResultantGame).
	
incNumCPUSQ(Game, ResultantGame):-
	getGameNumPlayerSQ(Game, NumCPUSQ),
	NumCPUSQ1 is NumCPUSQ + 1,
	setGameNumCPUSQ(NumCPUSQ1, Game, ResultantGame).
	
addNumCPUSQ(Game, ResultantGame, Value):-
	getGameNumPlayerSQ(Game, CPUSQ),
	CPUSQ1 is CPUSQ + Value,
	setGameNumCPUSQ(CPUSQ1, Game, ResultantGame).
	
setGameNumCPUSQ(NumCPUSQ, Game, ResultantGame):-
	getGameNumSquaresList(Game, NumPiecesList),
	setListElemAtWith(1, NumCPUSQ, NumPiecesList, ResNumPiecesList),
	setGameNumSquaresList(ResNumPiecesList, Game, ResultantGame).
	
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% PLAYER %%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%% PECAS DE MARCACAO

getGameNumPlayerX(Game, NumPlayerX):-
	getGameNumCrossesList(Game, NumPiecesList),
	getListElemAt(0, NumPiecesList, NumPlayerX).

decNumPlayerX(Game, ResultantGame):-
	getGameNumPlayerX(Game, NumPlayerX),
	NumPlayerX1 is NumPlayerX - 1,
	setGameNumPlayerX(NumPlayerX1, Game, ResultantGame).
	
incNumPlayerX(Game, ResultantGame):-
	getGameNumPlayerX(Game, NumPlayerX),
	NumPlayerX1 is NumPlayerX + 1,
	setGameNumPlayerX(NumPlayerX1, Game, ResultantGame).
	
addNumPlayerX(Game, ResultantGame, Value):-
	getGameNumPlayerX(Game, NumPlayerX),
	NumPlayerX1 is NumPlayerX + Value,
	setGameNumPlayerX(NumPlayerX1, Game, ResultantGame).
	
setGameNumPlayerX(NumPlayerX, Game, ResultantGame):-
	getGameNumCrossesList(Game, NumPiecesList),
	setListElemAtWith(0, NumPlayerX, NumPiecesList, ResNumPiecesList),
	setGameNumPiecesList(ResNumPiecesList, Game, ResultantGame).
	
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%% PECAS DE PONTUACAO %%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 

getGameNumPlayerSQ(Game, NumPlayerSQ):-
	getGameNumSquaresList(Game, NumPiecesList),
	getListElemAt(0, NumPiecesList, NumPlayerSQ).

decNumPlayerSQ(Game, ResultantGame):-
	getGameNumPlayerSQ(Game, NumPlayerSQ),
	NumPlayerSQ1 is NumPlayerSQ - 1,
	setGameNumPlayerSQ(NumPlayerSQ1, Game, ResultantGame).
	
incNumPlayerSQ(Game, ResultantGame):-
	getGameNumPlayerSQ(Game, NumPlayerSQ),
	NumPlayerSQ1 is NumPlayerSQ + 1,
	setGameNumPlayerSQ(NumPlayerSQ1, Game, ResultantGame).
	
addNumPlayerSQ(Game, ResultantGame, Value):-
	getGameNumPlayerSQ(Game, NumPlayerSQ),
	NumPlayerSQ1 is NumPlayerSQ + Value,
	setGameNumPlayerSQ(NumPlayerSQ1, Game, ResultantGame).
	
setGameNumPlayerSQ(NumPlayerSQ, Game, ResultantGame):-
	getGameNumSquaresList(Game, NumPiecesList),
	setListElemAtWith(0, NumPlayerSQ, NumPiecesList, ResNumPiecesList),
	setGameNumSquaresList(ResNumPiecesList, Game, ResultantGame).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% TURN HANDLING %%%%%%%%%%%%%%%%%%%%%%%%%

getGamePlayerTurn(Game, Player):-
        getListElemAt(3, Game, Player).

setGamePlayerTurn(Player, Game, ResultantGame):-
        setListElemAtWith(3, Player, Game, ResultantGame).
	
	