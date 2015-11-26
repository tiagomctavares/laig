:-include('util.pl').

mainMenu:-
        printMainMenu,
        getChar(Input),
        processInput(Input).

processInput(Input):-
        Input = '1',
        startGame.

processInput(Input):-
        Input = '2',
        startGameWithRandomBot.

processInput(Input):-
        Input = '3',
        startGameWithGreedyBot.

processInput(Input):-
        Input = '4',
        startGamePvP.


processInput(Input):-
        Input = '9',
        startGameWithExploiterBot.

processInput(Input):-
        Input = '0',
        startGameWithExploiterAggressiveBot.

processInput(Input):-
        Input = '5'.


startGame:-
        createNewGame(Game),
        humanPlaceX(Game,ResultantGame), !,
        playGame(ResultantGame),mainMenu.

startGameWithRandomBot:-
        createNewGame(Game),
        humanPlaceX(Game,ResultantGame), !,
        playGameRandomBot(ResultantGame),mainMenu.

startGameWithGreedyBot:-
        createNewGame(Game),
        humanPlaceX(Game,ResultantGame), !,
        playGameGreedyBot(ResultantGame),mainMenu.

startGameWithExploiterBot:-
        createNewGame(Game),
        humanPlaceX(Game,ResultantGame), !,
        playGameExploiterBot(ResultantGame),mainMenu.

startGameWithExploiterAggressiveBot:-
        createNewGame(Game),
        humanPlaceX(Game,ResultantGame), !,
        playGameExploiterAgressiveBot(ResultantGame),mainMenu.

startGamePvP:-
        createNewGame(Game),
        prologPlaceWhitePiece(0,Game,ResultantGame),
        getGameBoard(ResultantGame,Board),
        imprimeBoard(Board), !,
        playGamePvP(ResultantGame),mainMenu.

printMainMenu:-
        clearConsole,
        write('===================================='), nl,
        write('=              Mod X               ='), nl,
        write('===================================='), nl,
        write('=                                  ='), nl,
        write('=   1. Play                        ='), nl,
        write('=   2. Play w/ Random              ='), nl,
        write('=   3. Play Greedy Bot             ='), nl,
        write('=   4. Player versus Player        ='), nl,
        write('=   5. Exit                        ='), nl,
        write('=                                  ='), nl,
        write('=                                  ='), nl,
        write('=                                  ='), nl,
        write('=   9. Play w/ Exploit Advantage   ='), nl,
        write('=   0. Play (Agressive/Exploiter)  ='), nl,
        write('===================================='), nl,
        write('Choose an option:'), nl.