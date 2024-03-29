getChar(Input):-
        get_char(Input),
        get_char(_).

clearConsole:-
        clearConsole(40), !.

clearConsole(0).
clearConsole(N):-
        nl,
        N1 is N-1,
        clearConsole(N1).

pressEnterToContinue:-
        write('Press <Enter> to continue.'), nl,
        waitForEnter, !.

getCode(Input):-
        get_code(TempInput),
        get_code(_),
        Input is TempInput - 48.

waitForEnter:-
        get_char(_).

scanInt(Input):-
        get_code(TempInput),
        Input is TempInput - 48.

discardInputChar:-
        get_code(_).

generateSeed:-
        now(Usec), Seed is Usec mod 30269,
        getrand(random(X, Y, Z, _)),
        setrand(random(Seed, X, Y, Z)), !.