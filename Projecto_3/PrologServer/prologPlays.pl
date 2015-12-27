prologPlays(Game,ResultantGame):-
        getGameBoard(Game, Board),

        repeat,
        
        random(0,8,DestRow),
        random(0,8,DestCol),
        
        testPosition(DestRow,DestCol,Board,RetPiece),
        setMatrixElemAtWith(DestRow, DestCol,RetPiece, Board, ResultantBoard),
        setGameBoard(ResultantBoard, Game, TempGame),
               
        ResultantGame = TempGame, !.


accessAllMatrix([],_,_,List,List):-
        !.

accessAllMatrix([H|T],Index,RetIndexOriginal,List,RetListOriginal):-
        
        accessMatrix(H,Index,RetIndex,List,RetList),
        Index1 is RetIndex,
        append(RetList,[],RetList1),
        accessAllMatrix(T,Index1,RetIndexOriginal,RetList1,RetListOriginal).

accessMatrix([],Index,Index,List,List):-
        !.

accessMatrix([H|T],Index,RetIndex,List,RetList):-
        
        H == 'CPU2X',
        append(List,[Index],RetList2),
        Index1 is Index + 1,
        accessMatrix(T,Index1,RetIndex,RetList2,RetList), !.

accessMatrix([H|T],Index,RetIndex,List,RetList):-
        
        H == whitePiece,
        append(List,[Index],RetList2),
        Index1 is Index + 1,
        accessMatrix(T,Index1,RetIndex,RetList2,RetList), !.

accessMatrix([H|T],Index,RetIndex,List,RetList):-
        
        H == squarePlayerOverlap,
        append(List,[Index],RetList2),
        Index1 is Index + 1,
        accessMatrix(T,Index1,RetIndex,RetList2,RetList), !.

accessMatrix([_|T],Index,RetIndex,List,RetList):-
        Index1 is Index + 1,
        accessMatrix(T,Index1,RetIndex,List,RetList), !.




testDireita(X,Board,Resposta):-
        X_Direita is X + 1,
        
        RowDireita is X_Direita // 8,
        ColDireita is X_Direita rem 8,
        
        RowDireita > -1,
        ColDireita > -1,
        
        ColDireita < 8,
        RowDireita < 8,

        findPiece(Board,0,0,_,RetOldBoard),

        isFree(RowDireita,ColDireita,Board,RetPiece),
        
        setMatrixElemAtWith(RowDireita,ColDireita,RetPiece,Board,ResultBoard),

        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),

        findPiece(RetBoard,0,0,_,RetCPU),

        RetCPU > RetOldBoard,       

        Resposta = X_Direita.

testEsquerda(X,Board,Resposta):-
        X_Esquerda is X - 1,
        
        RowEsquerda is X_Esquerda // 8,
        ColEsquerda is X_Esquerda rem 8,
        
        RowEsquerda > -1,
        ColEsquerda > -1,
        
        ColEsquerda < 8,
        RowEsquerda < 8,

        findPiece(Board,0,0,_,RetOldBoard),
        
        isFree(RowEsquerda,ColEsquerda,Board,RetPiece),
        
        setMatrixElemAtWith(RowEsquerda,ColEsquerda,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,_,RetCPU),
        
        RetCPU > RetOldBoard,       
        
        Resposta = X_Esquerda.
        
testCima(X,Board,Resposta):-
        X_Cima is X - 8,
        
        
        RowCima is X_Cima // 8,
        ColCima is X_Cima rem 8,

        
        RowCima > -1,
        ColCima > -1,
        
        ColCima < 8,
        RowCima < 8,
        
        
        findPiece(Board,0,0,_,RetOldBoard),
        
        isFree(RowCima,ColCima,Board,RetPiece),
        
        setMatrixElemAtWith(RowCima,ColCima,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,_,RetCPU),
        
        RetCPU > RetOldBoard,       
        
        Resposta = X_Cima.

testBaixo(X,Board,Resposta):-
        X_Baixo is X + 8,
        
        
        RowBaixo is X_Baixo // 8,
        ColBaixo is X_Baixo rem 8,
        
        RowBaixo > -1,
        ColBaixo > -1,
        
        ColBaixo < 8,
        RowBaixo < 8,
        
        findPiece(Board,0,0,_,RetOldBoard),
        
        isFree(RowBaixo,ColBaixo,Board,RetPiece),
        
        setMatrixElemAtWith(RowBaixo,ColBaixo,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,_,RetCPU),
        
        RetCPU > RetOldBoard,       
        
        Resposta = X_Baixo.

testDiagonalCD(X,Board,Resposta):-
        X_DiagonalCimaDireita is X - 7,
        
        RowDiagonalCimaDireita is X_DiagonalCimaDireita // 8,
        ColDiagonalCimaDireita is X_DiagonalCimaDireita rem 8,
        
        RowDiagonalCimaDireita > -1,
        ColDiagonalCimaDireita > -1,
        
        ColDiagonalCimaDireita < 8,
        RowDiagonalCimaDireita < 8,
        
        findPiece(Board,0,0,_,RetOldBoard),
        
        isFree(RowDiagonalCimaDireita,ColDiagonalCimaDireita,Board,RetPiece),
        
        setMatrixElemAtWith(RowDiagonalCimaDireita,ColDiagonalCimaDireita,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,_,RetCPU),
        
        RetCPU > RetOldBoard,       
        
        Resposta = X_DiagonalCimaDireita.

testDiagonalCE(X,Board,Resposta):-
        X_DiagonalCimaEsquerda is X - 9,
        
        RowDiagonalCimaEsquerda is X_DiagonalCimaEsquerda // 8,
        ColDiagonalCimaEsquerda is X_DiagonalCimaEsquerda rem 8,
        
        RowDiagonalCimaEsquerda > -1,
        ColDiagonalCimaEsquerda > -1,
        
        ColDiagonalCimaEsquerda < 8,
        RowDiagonalCimaEsquerda < 8,
        
        findPiece(Board,0,0,_,RetOldBoard),
        
        isFree(RowDiagonalCimaEsquerda,ColDiagonalCimaEsquerda,Board,RetPiece),
        
        setMatrixElemAtWith(RowDiagonalCimaEsquerda,ColDiagonalCimaEsquerda,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,_,RetCPU),
        
        RetCPU > RetOldBoard,       
        
        Resposta = X_DiagonalCimaEsquerda.

testDiagonalBE(X,Board,Resposta):-
        X_DiagonalBaixoEsquerda is X + 7,
        
        RowDiagonalBaixoEsquerda is X_DiagonalBaixoEsquerda // 8,
        ColDiagonalBaixoEsquerda is X_DiagonalBaixoEsquerda rem 8,
        
        RowDiagonalBaixoEsquerda > -1,
        ColDiagonalBaixoEsquerda > -1,
        
        ColDiagonalBaixoEsquerda < 8,
        RowDiagonalBaixoEsquerda < 8,
        
        findPiece(Board,0,0,_,RetOldBoard),
        
        isFree(RowDiagonalBaixoEsquerda,ColDiagonalBaixoEsquerda,Board,RetPiece),
        
        setMatrixElemAtWith(RowDiagonalBaixoEsquerda,ColDiagonalBaixoEsquerda,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,_,RetCPU),
        
        RetCPU > RetOldBoard,       
        
        Resposta = X_DiagonalBaixoEsquerda.
        
        

testDiagonalBD(X,Board,Resposta):-
         X_DiagonalBaixoDireita is X + 9,
        
        RowDiagonalBaixoDireita is X_DiagonalBaixoDireita // 8,
        ColDiagonalBaixoDireita is X_DiagonalBaixoDireita rem 8,
        
        RowDiagonalBaixoDireita > -1,
        ColDiagonalBaixoDireita > -1,
        
        ColDiagonalBaixoDireita < 8,
        RowDiagonalBaixoDireita < 8,
        
        findPiece(Board,0,0,_,RetOldBoard),
        
        isFree(RowDiagonalBaixoDireita,ColDiagonalBaixoDireita,Board,RetPiece),
        
        setMatrixElemAtWith(RowDiagonalBaixoDireita,ColDiagonalBaixoDireita,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,_,RetCPU),
        
        RetCPU > RetOldBoard,       
        
        Resposta = X_DiagonalBaixoDireita.
        

testAdjacent([],_,_):-
        fail, !.
        
testAdjacent([H|_],Board,Resposta):-
        testDireita(H,Board,Resposta), !.

testAdjacent([H|_],Board,Resposta):-
        testEsquerda(H,Board,Resposta), !.

testAdjacent([H|_],Board,Resposta):-
        testCima(H,Board,Resposta), !.

testAdjacent([H|_],Board,Resposta):-
        testBaixo(H,Board,Resposta), !.

testAdjacent([H|_],Board,Resposta):-
        testDiagonalCD(H,Board,Resposta), !.

testAdjacent([H|_],Board,Resposta):-
        testDiagonalCE(H,Board,Resposta), !.

testAdjacent([H|_],Board,Resposta):-
        testDiagonalBD(H,Board,Resposta), !.

testAdjacent([H|_],Board,Resposta):-
        testDiagonalBE(H,Board,Resposta), !.

testAdjacent([_|T],Board,Resposta):-
        write('adfokadfda'),nl,
        testAdjacent(T,Board,Resposta), !.



accessPlayerPieces([],_,_,List,List):-
        !.


accessPlayerPieces([H|T],Index,RetIndexOriginal,List,RetListOriginal):-
        
        accessHeadMatrix(H,Index,RetIndex,List,RetList),
        Index1 is RetIndex,
        append(RetList,[],RetList1),
        accessPlayerPieces(T,Index1,RetIndexOriginal,RetList1,RetListOriginal).

accessHeadMatrix([],Index,Index,List,List):-
        !.

accessHeadMatrix([H|T],Index,RetIndex,List,RetList):-
        
        H == player1X,
        append(List,[Index],RetList2),
        Index1 is Index + 1,
        accessHeadMatrix(T,Index1,RetIndex,RetList2,RetList), !.

accessHeadMatrix([H|T],Index,RetIndex,List,RetList):-
        
        H == whitePiece,
        append(List,[Index],RetList2),
        Index1 is Index + 1,
        accessHeadMatrix(T,Index1,RetIndex,RetList2,RetList), !.

accessHeadMatrix([H|T],Index,RetIndex,List,RetList):-
        
        H == squareCPUOverlap,
        append(List,[Index],RetList2),
        Index1 is Index + 1,
        accessHeadMatrix(T,Index1,RetIndex,RetList2,RetList), !.


accessHeadMatrix([_|T],Index,RetIndex,List,RetList):-
        Index1 is Index + 1,
        accessHeadMatrix(T,Index1,RetIndex,List,RetList), !.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%
%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%
%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

accessPlayerSquarePieces([],_,_,List,List):-
        !.


accessPlayerSquarePieces([H|T],Index,RetIndexOriginal,List,RetListOriginal):-
        
        accessSquare(H,Index,RetIndex,List,RetList),
        Index1 is RetIndex,
        append(RetList,[],RetList1),
        accessPlayerSquarePieces(T,Index1,RetIndexOriginal,RetList1,RetListOriginal).

accessSquare([],Index,Index,List,List):-
        !.

accessSquare([H|T],Index,RetIndex,List,RetList):-
        
        H == playersquare,
        append(List,[Index],RetList2),
        Index1 is Index + 1,
        accessSquare(T,Index1,RetIndex,RetList2,RetList), !.

accessSquare([_|T],Index,RetIndex,List,RetList):-
        Index1 is Index + 1,
        accessSquare(T,Index1,RetIndex,List,RetList), !.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

predictDireita(X,Board,Resposta):-
        X_Direita is X + 1,
        
        RowDireita is X_Direita // 8,
        ColDireita is X_Direita rem 8,
        
        RowDireita > -1,
        ColDireita > -1,
        
        ColDireita < 8,
        RowDireita < 8,

        findPiece(Board,0,0,RetOldBoard,_),

        isFreeFromPlayer(RowDireita,ColDireita,Board,RetPiece),
        
        setMatrixElemAtWith(RowDireita,ColDireita,RetPiece,Board,ResultBoard),

        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),

        findPiece(RetBoard,0,0,RetPlayer,_),

        RetPlayer > RetOldBoard,       

        Resposta = X_Direita.

predictEsquerda(X,Board,Resposta):-
        X_Esquerda is X - 1,
        
        RowEsquerda is X_Esquerda // 8,
        ColEsquerda is X_Esquerda rem 8,
        
        RowEsquerda > -1,
        ColEsquerda > -1,
        
        ColEsquerda < 8,
        RowEsquerda < 8,

        findPiece(Board,0,0,RetOldBoard,_),
        
        isFreeFromPlayer(RowEsquerda,ColEsquerda,Board,RetPiece),
        
        setMatrixElemAtWith(RowEsquerda,ColEsquerda,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,RetPlayer,_),
        
        RetPlayer > RetOldBoard,       
        
        Resposta = X_Esquerda.
        
predictCima(X,Board,Resposta):-
        X_Cima is X - 8,
        
        
        RowCima is X_Cima // 8,
        ColCima is X_Cima rem 8,

        
        RowCima > -1,
        ColCima > -1,
        
        ColCima < 8,
        RowCima < 8,
        
        
        findPiece(Board,0,0,RetOldBoard,_),
        
        isFreeFromPlayer(RowCima,ColCima,Board,RetPiece),
        
        setMatrixElemAtWith(RowCima,ColCima,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,RetPlayer,_),
        
        RetPlayer > RetOldBoard,       
        
        Resposta = X_Cima.

predictBaixo(X,Board,Resposta):-
        X_Baixo is X + 8,
        
        
        RowBaixo is X_Baixo // 8,
        ColBaixo is X_Baixo rem 8,
        
        RowBaixo > -1,
        ColBaixo > -1,
        
        ColBaixo < 8,
        RowBaixo < 8,
        
        findPiece(Board,0,0,RetOldBoard,_),
        
        isFreeFromPlayer(RowBaixo,ColBaixo,Board,RetPiece),
        
        setMatrixElemAtWith(RowBaixo,ColBaixo,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,RetPlayer,_),
        
        RetPlayer > RetOldBoard,       
        
        Resposta = X_Baixo.

predictDiagonalCD(X,Board,Resposta):-
        X_DiagonalCimaDireita is X - 7,
        
        RowDiagonalCimaDireita is X_DiagonalCimaDireita // 8,
        ColDiagonalCimaDireita is X_DiagonalCimaDireita rem 8,
        
        RowDiagonalCimaDireita > -1,
        ColDiagonalCimaDireita > -1,
        
        ColDiagonalCimaDireita < 8,
        RowDiagonalCimaDireita < 8,
        
        findPiece(Board,0,0,RetOldBoard,_),
        
        isFreeFromPlayer(RowDiagonalCimaDireita,ColDiagonalCimaDireita,Board,RetPiece),
        
        setMatrixElemAtWith(RowDiagonalCimaDireita,ColDiagonalCimaDireita,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,RetPlayer,_),
        
        RetPlayer > RetOldBoard,       
        
        Resposta = X_DiagonalCimaDireita.

predictDiagonalCE(X,Board,Resposta):-
        X_DiagonalCimaEsquerda is X - 9,
        
        RowDiagonalCimaEsquerda is X_DiagonalCimaEsquerda // 8,
        ColDiagonalCimaEsquerda is X_DiagonalCimaEsquerda rem 8,
        
        RowDiagonalCimaEsquerda > -1,
        ColDiagonalCimaEsquerda > -1,
        
        ColDiagonalCimaEsquerda < 8,
        RowDiagonalCimaEsquerda < 8,
        
        findPiece(Board,0,0,RetOldBoard,_),
        
        isFreeFromPlayer(RowDiagonalCimaEsquerda,ColDiagonalCimaEsquerda,Board,RetPiece),
        
        setMatrixElemAtWith(RowDiagonalCimaEsquerda,ColDiagonalCimaEsquerda,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,RetPlayer,_),
        
        RetPlayer > RetOldBoard,        
        
        Resposta = X_DiagonalCimaEsquerda.

predictDiagonalBE(X,Board,Resposta):-
        X_DiagonalBaixoEsquerda is X + 7,
        
        RowDiagonalBaixoEsquerda is X_DiagonalBaixoEsquerda // 8,
        ColDiagonalBaixoEsquerda is X_DiagonalBaixoEsquerda rem 8,
        
        RowDiagonalBaixoEsquerda > -1,
        ColDiagonalBaixoEsquerda > -1,
        
        ColDiagonalBaixoEsquerda < 8,
        RowDiagonalBaixoEsquerda < 8,
        
        findPiece(Board,0,0,RetOldBoard,_),
        
        isFreeFromPlayer(RowDiagonalBaixoEsquerda,ColDiagonalBaixoEsquerda,Board,RetPiece),
        
        setMatrixElemAtWith(RowDiagonalBaixoEsquerda,ColDiagonalBaixoEsquerda,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,RetPlayer,_),
        
        RetPlayer > RetOldBoard,           
        
        Resposta = X_DiagonalBaixoEsquerda.
        
        

predictDiagonalBD(X,Board,Resposta):-
         X_DiagonalBaixoDireita is X + 9,
        
        RowDiagonalBaixoDireita is X_DiagonalBaixoDireita // 8,
        ColDiagonalBaixoDireita is X_DiagonalBaixoDireita rem 8,
        
        RowDiagonalBaixoDireita > -1,
        ColDiagonalBaixoDireita > -1,
        
        ColDiagonalBaixoDireita < 8,
        RowDiagonalBaixoDireita < 8,
        
        findPiece(Board,0,0,RetOldBoard,_),
        
        isFreeFromPlayer(RowDiagonalBaixoDireita,ColDiagonalBaixoDireita,Board,RetPiece),
        
        setMatrixElemAtWith(RowDiagonalBaixoDireita,ColDiagonalBaixoDireita,RetPiece,Board,ResultBoard),
        
        navigateMatrix(ResultBoard,0,_,ResultBoard,RetBoard),
        
        findPiece(RetBoard,0,0,RetPlayer,_),
        
        RetPlayer > RetOldBoard,    
        
        Resposta = X_DiagonalBaixoDireita.


predictPlayerMove([],_,_):-
        fail, !.

predictPlayerMove([H|_],Board,Resposta):-
        predictDireita(H,Board,Resposta), !.

predictPlayerMove([H|_],Board,Resposta):-
        predictEsquerda(H,Board,Resposta), !.

predictPlayerMove([H|_],Board,Resposta):-
        predictCima(H,Board,Resposta), !.

predictPlayerMove([H|_],Board,Resposta):-
        predictBaixo(H,Board,Resposta), !.

predictPlayerMove([H|_],Board,Resposta):-
        predictDiagonalCD(H,Board,Resposta), !.

predictPlayerMove([H|_],Board,Resposta):-
        predictDiagonalCE(H,Board,Resposta), !.

predictPlayerMove([H|_],Board,Resposta):-
        predictDiagonalBD(H,Board,Resposta), !.

predictPlayerMove([H|_],Board,Resposta):-
        predictDiagonalBE(H,Board,Resposta), !.

predictPlayerMove([_|T],Board,Resposta):-
        predictPlayerMove(T,Board,Resposta), !.





%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

isImportantPiece(Elem):-
        Elem \= free,
        Elem \= 'CPU2X',
        Elem \= playersquare,
        Elem \= 'CPUsquare',
        Elem \= squareCPUOverlap.

isLegit(Elem):-
        Elem \= player1X,
        Elem \= 'CPU2X',
        Elem \= 'CPUsquare',
        Elem \= whitePiece,
        Elem \= squarePlayerOverlap,
        Elem \= squareCPUOverlap.

superpredictDireita(X,Board,Resposta):-
        
        X_Direita is X + 1,
        X_Direita2 is X + 2,
        
        RowDireita is X_Direita // 8,
        ColDireita is X_Direita rem 8,
        
        RowDireita2 is X_Direita2 // 8,
        ColDireita2 is X_Direita2 rem 8,
        
        RowDireita > -1,
        ColDireita > -1,
        
        ColDireita < 8,
        RowDireita < 8,
        
        RowDireita2 > -1,
        ColDireita2 > -1,
        
        RowDireita2 < 8,
        ColDireita2 < 8,

        getMatrixElemAt(RowDireita,ColDireita, Board, ElemDireita),
        isImportantPiece(ElemDireita),
        
        getMatrixElemAt(RowDireita2,ColDireita2, Board, ElemDireita2),
        isImportantPiece(ElemDireita2),
        
        X_Block is X + 3,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.

superpredictDireita(X,Board,Resposta):-
        
        X_Direita is X + 1,
        X_Direita2 is X + 2,
        
        RowDireita is X_Direita // 8,
        ColDireita is X_Direita rem 8,
        
        RowDireita2 is X_Direita2 // 8,
        ColDireita2 is X_Direita2 rem 8,
        
        RowDireita > -1,
        ColDireita > -1,
        
        ColDireita < 8,
        RowDireita < 8,
        
        RowDireita2 > -1,
        ColDireita2 > -1,
        
        RowDireita2 < 8,
        ColDireita2 < 8,

        getMatrixElemAt(RowDireita,ColDireita, Board, ElemDireita),
        isImportantPiece(ElemDireita),
        
        getMatrixElemAt(RowDireita2,ColDireita2, Board, ElemDireita2),
        isImportantPiece(ElemDireita2),
        
        X_Block is X - 1,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.

superpredictEsquerda(X,Board,Resposta):-
        
        X_Esquerda is X - 1,
        X_Esquerda2 is X - 2,
        
        Row1 is X_Esquerda // 8,
        Col1 is X_Esquerda rem 8,
        
        Row2 is X_Esquerda2 // 8,
        Col2 is X_Esquerda2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X + 1,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.

superpredictEsquerda(X,Board,Resposta):-
        
        X_Esquerda is X - 1,
        X_Esquerda2 is X - 2,
        
        Row1 is X_Esquerda // 8,
        Col1 is X_Esquerda rem 8,
        
        Row2 is X_Esquerda2 // 8,
        Col2 is X_Esquerda2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X - 3,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.
        
superpredictCima(X,Board,Resposta):-
        
        X1 is X - 8,
        X2 is X - 16,
        
        Row1 is X1 // 8,
        Col1 is X1 rem 8,
        
        Row2 is X2 // 8,
        Col2 is X2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X - 24,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.

superpredictCima(X,Board,Resposta):-
        
        X1 is X - 8,
        X2 is X - 16,
        
        Row1 is X1 // 8,
        Col1 is X1 rem 8,
        
        Row2 is X2 // 8,
        Col2 is X2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X + 8,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.

superpredictBaixo(X,Board,Resposta):-
        
        X1 is X + 8,
        X2 is X + 16,
        
        Row1 is X1 // 8,
        Col1 is X1 rem 8,
        
        Row2 is X2 // 8,
        Col2 is X2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X - 8,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.

superpredictBaixo(X,Board,Resposta):-
        
        X1 is X + 8,
        X2 is X + 16,
        
        Row1 is X1 // 8,
        Col1 is X1 rem 8,
        
        Row2 is X2 // 8,
        Col2 is X2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X +24,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.

superpredictDiagonalCD(X,Board,Resposta):-
        
        X1 is X - 7,
        X2 is X - 14,
        
        Row1 is X1 // 8,
        Col1 is X1 rem 8,
        
        Row2 is X2 // 8,
        Col2 is X2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X - 21,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.

superpredictDiagonalCD(X,Board,Resposta):-
        
        X1 is X - 7,
        X2 is X - 14,
        
        Row1 is X1 // 8,
        Col1 is X1 rem 8,
        
        Row2 is X2 // 8,
        Col2 is X2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X + 7,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.

superpredictDiagonalCE(X,Board,Resposta):-
        
        X1 is X - 9,
        X2 is X - 18,
        
        Row1 is X1 // 8,
        Col1 is X1 rem 8,
        
        Row2 is X2 // 8,
        Col2 is X2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X - 27,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.

superpredictDiagonalCE(X,Board,Resposta):-
        
        X1 is X - 9,
        X2 is X - 18,
        
        Row1 is X1 // 8,
        Col1 is X1 rem 8,
        
        Row2 is X2 // 8,
        Col2 is X2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X + 9,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.

superpredictDiagonalBE(X,Board,Resposta):-
        
        X1 is X + 7,
        X2 is X + 14,
        
        Row1 is X1 // 8,
        Col1 is X1 rem 8,
        
        Row2 is X2 // 8,
        Col2 is X2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X + 21,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.

superpredictDiagonalBE(X,Board,Resposta):-
        
        X1 is X + 7,
        X2 is X + 14,
        
        Row1 is X1 // 8,
        Col1 is X1 rem 8,
        
        Row2 is X2 // 8,
        Col2 is X2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X - 7,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.
        
        

superpredictDiagonalBD(X,Board,Resposta):-
 
        X1 is X + 9,
        X2 is X + 18,
        
        Row1 is X1 // 8,
        Col1 is X1 rem 8,
        
        Row2 is X2 // 8,
        Col2 is X2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X + 27,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.

superpredictDiagonalBD(X,Board,Resposta):-
 
        X1 is X + 9,
        X2 is X + 18,
        
        Row1 is X1 // 8,
        Col1 is X1 rem 8,
        
        Row2 is X2 // 8,
        Col2 is X2 rem 8,
        
        Row1 > -1,
        Col1 > -1,
        
        Col1 < 8,
        Row1 < 8,
        
        Row2 > -1,
        Col2 > -1,
        
        Row2 < 8,
        Col2 < 8,

        getMatrixElemAt(Row1,Col1, Board, Elem1),
        isImportantPiece(Elem1),
        
        getMatrixElemAt(Row2,Col2, Board, Elem2),
        isImportantPiece(Elem2),
        
        X_Block is X - 9,
        
        RowBlock is X_Block // 8,
        ColBlock is X_Block rem 8,
        
        getMatrixElemAt(RowBlock,ColBlock,Board,ElemBlock),
        isLegit(ElemBlock),
        
        Resposta = X_Block.




test2Adjacencies([],_,_):-
        fail, !.

test2Adjacencies([H|_],Board,Resposta):-
        superpredictDireita(H,Board,Resposta), !.

test2Adjacencies([H|_],Board,Resposta):-
        superpredictEsquerda(H,Board,Resposta), !.

test2Adjacencies([H|_],Board,Resposta):-
        superpredictCima(H,Board,Resposta), !.

test2Adjacencies([H|_],Board,Resposta):-
        superpredictBaixo(H,Board,Resposta), !.

test2Adjacencies([H|_],Board,Resposta):-
        superpredictDiagonalCD(H,Board,Resposta), !.

test2Adjacencies([H|_],Board,Resposta):-
        superpredictDiagonalCE(H,Board,Resposta), !.

test2Adjacencies([H|_],Board,Resposta):-
        superpredictDiagonalBD(H,Board,Resposta), !.

test2Adjacencies([H|_],Board,Resposta):-
        superpredictDiagonalBE(H,Board,Resposta), !.

test2Adjacencies([_|T],Board,Resposta):-
        
        test2Adjacencies(T,Board,Resposta), !.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

prologPlaysTrueGreedy(Game,ResultantGame):-
        getGameBoard(Game,Board),
        
        accessAllMatrix(Board,0,_,[],List),
        
        testAdjacent(List,Board,Resposta),
        
        RowDest is Resposta // 8,
        ColDest is Resposta rem 8,
        
        isFree(RowDest,ColDest,Board,RetPiece),
        setMatrixElemAtWith(RowDest,ColDest,RetPiece,Board,RetBoard),
        
        setGameBoard(RetBoard,Game,TempGame),
        
        ResultantGame = TempGame,
        write('O Prolog jogou gananciosamente'),nl, !.

prologPlaysTrueGreedy(Game,ResultantGame):-
        getGameBoard(Game,Board),

        write('O Prolog Jogou aleatoriamente'),nl,
        repeat,
        
        random(0,8,DestRow),
        random(0,8,DestCol),
        
        
        testPosition(DestRow,DestCol,Board,RetPiece),
        setMatrixElemAtWith(DestRow, DestCol, RetPiece, Board, ResultantBoard),
        setGameBoard(ResultantBoard, Game, TempGame),
               
        ResultantGame = TempGame, !. 


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

        
prologPlayGreedy(Game,ResultantGame):-
        getGameBoard(Game,Board),
        
        accessPlayerPieces(Board,0,_,[],List),
        
        test2Adjacencies(List,Board,Resposta),
        
        RowDest is Resposta // 8,
        ColDest is Resposta rem 8,
        
        isFree(RowDest,ColDest,Board,RetPiece),
        setMatrixElemAtWith(RowDest,ColDest,RetPiece,Board,RetBoard),
        
        setGameBoard(RetBoard,Game,TempGame),
        
        ResultantGame = TempGame,
        write('O Prolog jogou a prever eventuais jogadas'),nl, !.

prologPlayGreedy(Game,ResultantGame):-
        getGameBoard(Game,Board),
        
        accessAllMatrix(Board,0,_,[],List),
        
        testAdjacent(List,Board,Resposta),
        
        RowDest is Resposta // 8,
        ColDest is Resposta rem 8,
        
        isFree(RowDest,ColDest,Board,RetPiece),
        setMatrixElemAtWith(RowDest,ColDest,RetPiece,Board,RetBoard),
        
        setGameBoard(RetBoard,Game,TempGame),
        
        ResultantGame = TempGame,
        write('O Prolog jogou gananciosamente'),nl, !.

prologPlayGreedy(Game,ResultantGame):-
        getGameBoard(Game,Board),
        
        accessPlayerPieces(Board,0,_,[],List),
        
        predictPlayerMove(List,Board,Resposta),
        
        RowDest is Resposta // 8,
        ColDest is Resposta rem 8,        

        isFree(RowDest,ColDest,Board,RetPiece),
        setMatrixElemAtWith(RowDest,ColDest,RetPiece,Board,RetBoard),
        
        setGameBoard(RetBoard,Game,TempGame),
        
        ResultantGame = TempGame,
        
        write('O Prolog jogou defensivamente'),nl, !.




prologPlayGreedy(Game,ResultantGame):-
        getGameBoard(Game,Board),

        write('O Prolog Jogou aleatoriamente'),nl,
        repeat,
        
        random(0,8,DestRow),
        random(0,8,DestCol),
        
        
        testPosition(DestRow,DestCol,Board,RetPiece),
        setMatrixElemAtWith(DestRow, DestCol, RetPiece, Board, ResultantBoard),
        setGameBoard(ResultantBoard, Game, TempGame),
               
        ResultantGame = TempGame, !.

getHeadListElem([H|_],Resposta):-
        Resposta = H, !.

prologExploits(Game, ResultantGame):-
        getGameBoard(Game,Board),
        
        accessPlayerSquarePieces(Board,0,_,[],List),
        
        write(List),nl,
        
        getHeadListElem(List,Resposta),
        
        RowDest is Resposta // 8,
        ColDest is Resposta rem 8,        

        isFree(RowDest,ColDest,Board,RetPiece),
        setMatrixElemAtWith(RowDest,ColDest,RetPiece,Board,RetBoard),
        
        setGameBoard(RetBoard,Game,TempGame),
        
        ResultantGame = TempGame,
        
        write('O Prolog jogou defensivamente'),nl, !.

prologExploits(Game,ResultantGame):-
        getGameBoard(Game,Board),

        write('O Prolog Jogou aleatoriamente dentro do exploit'),nl,
        repeat,
        
        random(0,8,DestRow),
        random(0,8,DestCol),
        
        
        testPosition(DestRow,DestCol,Board,RetPiece),
        setMatrixElemAtWith(DestRow, DestCol, RetPiece, Board, ResultantBoard),
        setGameBoard(ResultantBoard, Game, TempGame),
               
        ResultantGame = TempGame, !.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

prologExploitsAndAgressive(Game, ResultantGame):-
        getGameBoard(Game,Board),
        
        accessPlayerSquarePieces(Board,0,_,[],List),
        
        write(List),nl,
        
        getHeadListElem(List,Resposta),
        
        RowDest is Resposta // 8,
        ColDest is Resposta rem 8,        

        isFree(RowDest,ColDest,Board,RetPiece),
        setMatrixElemAtWith(RowDest,ColDest,RetPiece,Board,RetBoard),
        
        setGameBoard(RetBoard,Game,TempGame),
        
        ResultantGame = TempGame,
        
        write('O Prolog jogou de forma a penalizar o jogador!'),nl, !.

prologExploitsAndAgressive(Game,ResultantGame):-
        getGameBoard(Game,Board),
        
        accessAllMatrix(Board,0,_,[],List),
        
        testAdjacent(List,Board,Resposta),
        
        RowDest is Resposta // 8,
        ColDest is Resposta rem 8,
        
        isFree(RowDest,ColDest,Board,RetPiece),
        setMatrixElemAtWith(RowDest,ColDest,RetPiece,Board,RetBoard),
        
        setGameBoard(RetBoard,Game,TempGame),
        
        ResultantGame = TempGame,
        write('O Prolog jogou gananciosamente'),nl, !.

prologExploitsAndAgressive(Game,ResultantGame):-
        getGameBoard(Game,Board),

        write('O Prolog Jogou aleatoriamente dentro do exploit'),nl,
        repeat,
        
        random(0,8,DestRow),
        random(0,8,DestCol),
        
        
        testPosition(DestRow,DestCol,Board,RetPiece),
        setMatrixElemAtWith(DestRow, DestCol, RetPiece, Board, ResultantBoard),
        setGameBoard(ResultantBoard, Game, TempGame),
               
        ResultantGame = TempGame, !.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        

testPosition(DestRow,DestCol,Board,RetPiece):-
        getMatrixElemAt(DestRow,DestCol,Board,Elem),
        Elem == free,
        RetPiece = 'CPU2X'.

testPosition(DestRow,DestCol,Board,RetPiece):-
        getMatrixElemAt(DestRow,DestCol,Board,Elem),
        Elem == playersquare,
        RetPiece = squarePlayerOverlap.

prologPlaceWhitePiece(Valor,Game,ResultantGame):-
        
        getGameBoard(Game,Board),
        
        Valor == 4,
        repeat,
        
        random(0,8,DestRow),
        random(0,8,DestCol),
        
        tryWhitePiece(DestRow,DestCol,Board,RetPiece),
        setMatrixElemAtWith(DestRow, DestCol,RetPiece, Board, ResultantBoard),
        
        setGameBoard(ResultantBoard, Game, TempGame),
        
        ResultantGame = TempGame, !.

prologPlaceWhitePiece(Valor,Game,ResultantGame):-
        
        getGameBoard(Game,Board),
        
        Valor == 3,
        repeat,
        
        random(0,8,DestRow1),
        random(0,8,DestCol1),
        
        tryWhitePiece(DestRow1,DestCol1,Board,RetPiece),
        setMatrixElemAtWith(DestRow1, DestCol1,RetPiece, Board, ResultantBoard),
        
        random(0,8,DestRow2),
        random(0,8,DestCol2),
        
        tryWhitePiece(DestRow2,DestCol2,Board,RetPiece),
        setMatrixElemAtWith(DestRow2, DestCol2,RetPiece, ResultantBoard, ResultantBoard2),
        
        setGameBoard(ResultantBoard2, Game, TempGame),
        
        ResultantGame = TempGame, !.

prologPlaceWhitePiece(Valor,Game,ResultantGame):-
        
        getGameBoard(Game,Board),
        
        Valor == 2,
        repeat,
        
        random(0,8,DestRow1),
        random(0,8,DestCol1),
        
        tryWhitePiece(DestRow1,DestCol1,Board,RetPiece),
        setMatrixElemAtWith(DestRow1, DestCol1,RetPiece, Board, ResultantBoard),
        
        random(0,8,DestRow2),
        random(0,8,DestCol2),
        
        tryWhitePiece(DestRow2,DestCol2,Board,RetPiece),
        setMatrixElemAtWith(DestRow2, DestCol2,RetPiece, ResultantBoard, ResultantBoard2),
        
        random(0,8,DestRow3),
        random(0,8,DestCol3),
        
        tryWhitePiece(DestRow3,DestCol3,Board,RetPiece),
        setMatrixElemAtWith(DestRow3, DestCol3,RetPiece, ResultantBoard2, ResultantBoard3),
        
        setGameBoard(ResultantBoard3, Game, TempGame),
        
        ResultantGame = TempGame, !.

prologPlaceWhitePiece(Valor,Game,ResultantGame):-
        
        getGameBoard(Game,Board),
        
        Valor == 1,
        repeat,
        
        random(0,8,DestRow1),
        random(0,8,DestCol1),
        
        tryWhitePiece(DestRow1,DestCol1,Board,RetPiece),
        setMatrixElemAtWith(DestRow1, DestCol1,RetPiece, Board, ResultantBoard),
        
        random(0,8,DestRow2),
        random(0,8,DestCol2),
        
        tryWhitePiece(DestRow2,DestCol2,Board,RetPiece),
        setMatrixElemAtWith(DestRow2, DestCol2,RetPiece, ResultantBoard, ResultantBoard2),
        
        random(0,8,DestRow3),
        random(0,8,DestCol3),
        
        tryWhitePiece(DestRow3,DestCol3,Board,RetPiece),
        setMatrixElemAtWith(DestRow3, DestCol3,RetPiece, ResultantBoard2, ResultantBoard3),
        
        random(0,8,DestRow4),
        random(0,8,DestCol4),
        
        tryWhitePiece(DestRow4,DestCol4,Board,RetPiece),
        setMatrixElemAtWith(DestRow4, DestCol4,RetPiece, ResultantBoard3, ResultantBoard4),
        
        setGameBoard(ResultantBoard4, Game, TempGame),
        
        ResultantGame = TempGame, !.

prologPlaceWhitePiece(Valor,Game,ResultantGame):-
        
        getGameBoard(Game,Board),
        
        Valor == 0,
        repeat,
        
        random(0,8,DestRow1),
        random(0,8,DestCol1),
        
        tryWhitePiece(DestRow1,DestCol1,Board,RetPiece),
        setMatrixElemAtWith(DestRow1, DestCol1,RetPiece, Board, ResultantBoard),
        
        random(0,8,DestRow2),
        random(0,8,DestCol2),
        
        tryWhitePiece(DestRow2,DestCol2,Board,RetPiece),
        setMatrixElemAtWith(DestRow2, DestCol2,RetPiece, ResultantBoard, ResultantBoard2),
        
        random(0,8,DestRow3),
        random(0,8,DestCol3),
        
        tryWhitePiece(DestRow3,DestCol3,Board,RetPiece),
        setMatrixElemAtWith(DestRow3, DestCol3,RetPiece, ResultantBoard2, ResultantBoard3),
        
        random(0,8,DestRow4),
        random(0,8,DestCol4),
        
        tryWhitePiece(DestRow4,DestCol4,Board,RetPiece),
        setMatrixElemAtWith(DestRow4, DestCol4,RetPiece, ResultantBoard3, ResultantBoard4),
        
        random(0,8,DestRow5),
        random(0,8,DestCol5),
        
        tryWhitePiece(DestRow5,DestCol5,Board,RetPiece),
        setMatrixElemAtWith(DestRow5, DestCol5,RetPiece, ResultantBoard4, ResultantBoard5),
        
        setGameBoard(ResultantBoard5, Game, TempGame),
        
        ResultantGame = TempGame, !.

prologPlaceWhitePiece(5,Game,Game).




tryWhitePiece(DestRow,DestCol,Board,RetPiece):-
        getMatrixElemAt(DestRow,DestCol,Board,Elem),
        Elem == free,
        RetPiece = whitePiece.


isFree(DestRow,DestCol,Board,RetPiece):-
        getMatrixElemAt(DestRow,DestCol,Board,Elem),
        Elem == free,
        RetPiece = 'CPU2X'.

isFree(DestRow,DestCol,Board,RetPiece):-
        getMatrixElemAt(DestRow,DestCol,Board,Elem),
        Elem == playersquare,
        RetPiece = squarePlayerOverlap.
                                         
isFreeFromPlayer(DestRow,DestCol,Board,RetPiece):-
        getMatrixElemAt(DestRow,DestCol,Board,Elem),
        Elem == free,
        RetPiece = player1X.

isFreeFromPlayer(DestRow,DestCol,Board,RetPiece):-
        getMatrixElemAt(DestRow,DestCol,Board,Elem),
        Elem == 'CPUsquare',
        RetPiece = squareCPUOverlap.                                         

prologPlaceWhitePieces(Game,ResultantGame):-
        getGameBoard(Game,Board),
        
        random(0,8,DestRow1),
        random(0,8,DestCol1),
        random(0,8,DestRow2),
        random(0,8,DestCol2),
        random(0,8,DestRow3),
        random(0,8,DestCol3),
        random(0,8,DestRow4),
        random(0,8,DestCol4),
        random(0,8,DestRow5),
        random(0,8,DestCol5),
        
        setMatrixElemAtWith(DestRow1,DestCol1,whitePiece,Board,ResultantBoard),

        setMatrixElemAtWith(DestRow2,DestCol2,whitePiece,ResultantBoard,ResultantBoard2),

        setMatrixElemAtWith(DestRow3,DestCol3,whitePiece,ResultantBoard2,ResultantBoard3),

        setMatrixElemAtWith(DestRow4,DestCol4,whitePiece,ResultantBoard3,ResultantBoard4),

        setMatrixElemAtWith(DestRow5,DestCol5,whitePiece,ResultantBoard4,ResultantBoard5),
        
        setGameBoard(ResultantBoard5,Game,TempGame),
        
        ResultantGame = TempGame, !.