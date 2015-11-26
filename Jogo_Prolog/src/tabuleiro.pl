/* -*- Mode:Prolog; coding:iso-8859-1; -*- */

getPiece('free',' ').
getPiece('player1X','1').
getPiece('CPU2X','2').
getPiece('playersquare','*').
getPiece('CPUsquare','+').
getPiece('whitePiece','O').
getPiece('squarePlayerOverlap','I').
getPiece('squareCPUOverlap','D').

printline:-
     write('     ---------------------------------'),nl.        

imprimeBoard([H|T]):-
        printColumnNumbers, nl,
        
        rowNumbers(RowNrs),
        imprime([H|T], RowNrs),nl,!.
        

printColumnNumbers:- write('       1   2   3   4   5   6   7   8').



rowNumbers(['  1  ', '  2  ', '  3  ', '  4  ', '  5  ', '  6  ', '  7  ', '  8  ']).

imprime([],[]):-
        printline.

imprime([H|T], [RowH|RowT]):-
                                    
       printline,write(RowH),mostra(H),nl,imprime(T,RowT).

imprimePontosJogador(Pontos):-
        write('O Jogador 1 possui: '),write(Pontos),write(' pontos!').
             
imprimePontosCPU(Pontos):-
        write('O Jogador CPU possui: '),write(Pontos),write(' pontos!').


   
mostra([]):-
        write('|').
mostra([H|T]):-
        getPiece(H,D),
        write('|'),write(' '),write(D),write(' '),mostra(T).


        

changePiece(X,RowNo,0,[H|_],L,Ret):-
        processRow(X,RowNo,H,L,Ret).
                    
changePiece(X,RowNo,ColNo,[_|T],L,Ret):-
        ColNo > 0,
        ColNo1 is ColNo - 1,
        changePiece(X,RowNo,ColNo1,T,L,Ret),
        imprime([Ret],[]).

processRow(_,0,[],[],_).

processRow(X,0,[_|T],L,_):-
       append([X],T,L2),
       append(L,L2,F),
       processRow(X,0,[],[],F).

processRow(X,RowNo,[H|T],L,Ret):-
        RowNo > 0,
        RowNo1 is RowNo - 1,
        append(L,[H],L2),
        processRow(X,RowNo1,T,L2,Ret).

setGameBoard(Board, Game, ResultantGame):-
        setListElemAtWith(0, Board, Game, ResultantGame).

setListElemAtWith(0, Elem, [_|L], [Elem|L]).
setListElemAtWith(I, Elem, [H|L], [H|ResL]):-
        I > 0,
        I1 is I-1,
        setListElemAtWith(I1, Elem, L, ResL).


setMatrixElemAtWith(0, ElemCol, NewElem, [RowAtTheHead|RemainingRows], [NewRowAtTheHead|RemainingRows]):-
        setListElemAtWith(ElemCol, NewElem, RowAtTheHead, NewRowAtTheHead).
setMatrixElemAtWith(ElemRow, ElemCol, NewElem, [RowAtTheHead|RemainingRows], [RowAtTheHead|ResultRemainingRows]):-
        ElemRow > 0,
        ElemRow1 is ElemRow-1,
        setMatrixElemAtWith(ElemRow1, ElemCol, NewElem, RemainingRows, ResultRemainingRows).

getListElemAt(0, [ElemAtTheHead|_], ElemAtTheHead).

getListElemAt(Pos, [_|RemainingElems], Elem):-
        Pos > 0,
        Pos1 is Pos-1,
        getListElemAt(Pos1, RemainingElems, Elem).

getMatrixElemAt(0, ElemCol, [ListAtTheHead|_], Elem):-
        getListElemAt(ElemCol, ListAtTheHead, Elem).
getMatrixElemAt(ElemRow, ElemCol, [_|RemainingLists], Elem):-
        ElemRow > 0,
        ElemRow1 is ElemRow-1,
        getMatrixElemAt(ElemRow1, ElemCol, RemainingLists, Elem).

testValidPiecesPlayer(Elem,Ret):-
        Elem \= 'free',
        Elem \= 'CPU2X',
        Elem \= 'playersquare',
        Elem \= 'CPUsquare',
        Elem \= 'squarePlayerOverlap',
        Elem \= 'whitePiece',
        Ret = valido.

testValidPiecesPlayer(Elem,_):-
        Elem \= 'free',
        Elem \= 'CPU2X',
        Elem \= 'playersquare',
        Elem \= 'CPUsquare',
        Elem \= 'squarePlayerOverlap'.
        
testValidPiecesCPU(Elem,Ret):-
        Elem \= 'free',
        Elem \= 'player1X',
        Elem \= 'playersquare',
        Elem \= 'CPUsquare',
        Elem \= 'squareCPUOverlap',
        Elem \= 'whitePiece',
        Ret = valido.

testValidPiecesCPU(Elem,_):-
        Elem \= 'free',
        Elem \= 'player1X',
        Elem \= 'playersquare',
        Elem \= 'CPUsquare',
        Elem \= 'squareCPUOverlap'.

isPiecePlayer(Elem):-
        Elem \= 'free',
        Elem \= 'CPU2X',
        Elem \= 'playersquare',
        Elem \= 'CPUsquare',
        Elem \= 'squarePlayerOverlap'.

isPieceCPU(Elem):-
        Elem \= 'free',
        Elem \= 'player1X',
        Elem \= 'playersquare',
        Elem \= 'CPUsquare',
        Elem \= 'squareCPUOverlap'.
        
        
testPlusShape(Row,Col,Board,Elem, ResultingBoard):-
        
        isPiecePlayer(Elem),        
         
        RowL is Row - 1,
        getMatrixElemAt(RowL,Col,Board,ElemLeft),
        
        testValidPiecesPlayer(ElemLeft,Ret),
        
        RowR is Row + 1,
        getMatrixElemAt(RowR,Col,Board,ElemRight),
        
        testValidPiecesPlayer(ElemRight,Ret),
        
        ColU is Col + 1,
        getMatrixElemAt(Row,ColU, Board, ElemUpper),
        
        testValidPiecesPlayer(ElemUpper,Ret),
        
        ColB is Col - 1,
        getMatrixElemAt(Row,ColB, Board, ElemBottom),
        
        testValidPiecesPlayer(ElemBottom,Ret),
        
        Ret == valido,
        
        setMatrixElemAtWith(Row,Col,'playersquare',Board,Board1),
        setMatrixElemAtWith(RowL,Col,'playersquare',Board1,Board2),
        setMatrixElemAtWith(RowR,Col,'playersquare',Board2,Board3),
        setMatrixElemAtWith(Row,ColU,'playersquare',Board3,Board4),
        setMatrixElemAtWith(Row,ColB,'playersquare',Board4,Board5),
        
        ResultingBoard = Board5, !.

testPlusShape(Row,Col,Board,Elem, ResultingBoard):-
        
        isPieceCPU(Elem),
        
        RowL is Row - 1,
        getMatrixElemAt(RowL,Col,Board,ElemLeft),
        
        testValidPiecesCPU(ElemLeft,Ret),
        
        RowR is Row + 1,
        getMatrixElemAt(RowR,Col,Board,ElemRight),
        
        testValidPiecesCPU(ElemRight,Ret),
        
        ColU is Col + 1,
        getMatrixElemAt(Row,ColU, Board, ElemUpper),
        
        testValidPiecesCPU(ElemUpper,Ret),
        
        ColB is Col - 1,
        getMatrixElemAt(Row,ColB, Board, ElemBottom),
        
        testValidPiecesCPU(ElemBottom,Ret),
        
        Ret == valido,
        
        setMatrixElemAtWith(Row,Col,'CPUsquare',Board,Board1),
        setMatrixElemAtWith(RowL,Col,'CPUsquare',Board1,Board2),
        setMatrixElemAtWith(RowR,Col,'CPUsquare',Board2,Board3),
        setMatrixElemAtWith(Row,ColU,'CPUsquare',Board3,Board4),
        setMatrixElemAtWith(Row,ColB,'CPUsquare',Board4,Board5),
        
        ResultingBoard = Board5, !.

testCrossShape(Row,Col,Board,Elem, ReturnBoard):-
        
       
       isPiecePlayer(Elem), 
        
       RowL is Row - 1,
       RowR is Row + 1,
       ColB is Col - 1,
       ColU is Col + 1,
       getMatrixElemAt(RowL,ColU,Board,ElemUpperLeft),
       
       testValidPiecesPlayer(ElemUpperLeft,Ret),       
       
       getMatrixElemAt(RowR,ColU,Board,ElemUpperRight),
       
       testValidPiecesPlayer(ElemUpperRight,Ret),        
       
       getMatrixElemAt(RowL,ColB, Board, ElemBottomLeft),
       
       testValidPiecesPlayer(ElemBottomLeft,Ret),      
       
       getMatrixElemAt(RowR,ColB, Board, ElemBottomRight),
       
       testValidPiecesPlayer(ElemBottomRight,Ret),
       
       Ret == valido,
       
       setMatrixElemAtWith(Row,Col,'playersquare',Board,Board1),
       setMatrixElemAtWith(RowL,ColU,'playersquare',Board1,Board2),
       setMatrixElemAtWith(RowR,ColU,'playersquare',Board2,Board3),
       setMatrixElemAtWith(RowL,ColB,'playersquare',Board3,Board4),
       setMatrixElemAtWith(RowR,ColB,'playersquare',Board4,Board5),
       
       ReturnBoard = Board5 , !.

testCrossShape(Row,Col,Board,Elem, ReturnBoard):-
        
       isPieceCPU(Elem),
        
       RowL is Row - 1,
       RowR is Row + 1,
       ColB is Col - 1,
       ColU is Col + 1,
       getMatrixElemAt(RowL,ColU,Board,ElemUpperLeft),
       
       testValidPiecesCPU(ElemUpperLeft,Ret),    
       
       getMatrixElemAt(RowR,ColU,Board,ElemUpperRight),
       
       testValidPiecesCPU(ElemUpperRight,Ret),       
       
       getMatrixElemAt(RowL,ColB, Board, ElemBottomLeft),
       
       testValidPiecesCPU(ElemBottomLeft,Ret),        
       
       getMatrixElemAt(RowR,ColB, Board, ElemBottomRight),
       
       testValidPiecesCPU(ElemBottomRight,Ret),
       
       Ret == valido,
       
       setMatrixElemAtWith(Row,Col,'CPUsquare',Board,Board1),
       setMatrixElemAtWith(RowL,ColU,'CPUsquare',Board1,Board2),
       setMatrixElemAtWith(RowR,ColU,'CPUsquare',Board2,Board3),
       setMatrixElemAtWith(RowL,ColB,'CPUsquare',Board3,Board4),
       setMatrixElemAtWith(RowR,ColB,'CPUsquare',Board4,Board5),
       
       ReturnBoard = Board5 , !.

testHorizontalLine(Row,Col,Board,Elem, ReturnBoard):-
       

       isPiecePlayer(Elem),

       ColB is Col - 1,
       ColU is Col + 1,
       ColBB is Col - 2,
       ColUU is Col + 2,
       getMatrixElemAt(Row,ColUU,Board,ElemUpperUpper),
      
       testValidPiecesPlayer(ElemUpperUpper,Ret),       
       
       getMatrixElemAt(Row,ColU,Board,ElemUpper),
       
       testValidPiecesPlayer(ElemUpper,Ret),        
       
       getMatrixElemAt(Row,ColBB, Board, ElemBottomBottom),
       
       testValidPiecesPlayer(ElemBottomBottom,Ret),        
       
       getMatrixElemAt(Row,ColB, Board, ElemBottom),
       
       testValidPiecesPlayer(ElemBottom,Ret),
       
       Ret == valido,
       
       setMatrixElemAtWith(Row,Col,'playersquare',Board,ResultantBoard),
       setMatrixElemAtWith(Row,ColUU,'playersquare',ResultantBoard,ResultantBoard2),
       setMatrixElemAtWith(Row,ColU,'playersquare',ResultantBoard2,ResultantBoard3),
       setMatrixElemAtWith(Row,ColBB,'playersquare',ResultantBoard3,ResultantBoard4),
       setMatrixElemAtWith(Row,ColB,'playersquare',ResultantBoard4,ResultantBoard5),
              
       ReturnBoard = ResultantBoard5 , !.

testHorizontalLine(Row,Col,Board,Elem, ReturnBoard):-
       
       
       isPieceCPU(Elem),

       ColB is Col - 1,
       ColU is Col + 1,
       ColBB is Col - 2,
       ColUU is Col + 2,
       
       getMatrixElemAt(Row,ColUU,Board,ElemUpperUpper),
      
       testValidPiecesCPU(ElemUpperUpper,Ret),     
       
       getMatrixElemAt(Row,ColU,Board,ElemUpper),
       
       testValidPiecesCPU(ElemUpper,Ret),        
       
       getMatrixElemAt(Row,ColBB, Board, ElemBottomBottom),
       
       testValidPiecesCPU(ElemBottomBottom,Ret),
       
       getMatrixElemAt(Row,ColB, Board, ElemBottom),
       
       testValidPiecesCPU(ElemBottom,Ret),
       
       Ret == valido,
       
       setMatrixElemAtWith(Row,Col,'CPUsquare',Board,ResultantBoard),
       setMatrixElemAtWith(Row,ColUU,'CPUsquare',ResultantBoard,ResultantBoard2),
       setMatrixElemAtWith(Row,ColU,'CPUsquare',ResultantBoard2,ResultantBoard3),
       setMatrixElemAtWith(Row,ColBB,'CPUsquare',ResultantBoard3,ResultantBoard4),
       setMatrixElemAtWith(Row,ColB,'CPUsquare',ResultantBoard4,ResultantBoard5),
              
       ReturnBoard = ResultantBoard5 , !.

testVerticalLine(Row,Col,Board,Elem, ReturnBoard):-
       
       isPiecePlayer(Elem),
        
       RowL is Row - 1,
       RowLL is Row + 1,
       RowR is Row - 2,
       RowRR is Row + 2,
       
       getMatrixElemAt(RowL,Col,Board,ElemLeft),
       testValidPiecesPlayer(ElemLeft,Ret),       
       
       getMatrixElemAt(RowLL,Col,Board,ElemLefterLeft),
       testValidPiecesPlayer(ElemLefterLeft,Ret),        
       
       getMatrixElemAt(RowR,Col, Board, ElemRight),
       testValidPiecesPlayer(ElemRight,Ret),      
       
       getMatrixElemAt(RowRR,Col, Board, ElemRighterRight),
       testValidPiecesPlayer(ElemRighterRight,Ret),
       
       Ret == valido,
       
       setMatrixElemAtWith(Row,Col,'playersquare',Board,Board1),
       setMatrixElemAtWith(RowL,Col,'playersquare',Board1,Board2),
       setMatrixElemAtWith(RowLL,Col,'playersquare',Board2,Board3),
       setMatrixElemAtWith(RowR,Col,'playersquare',Board3,Board4),
       setMatrixElemAtWith(RowRR,Col,'playersquare',Board4,Board5),
       
       imprimeBoard(Board5),nl,
       
       ReturnBoard = Board5 , !.

testVerticalLine(Row,Col,Board,Elem, ReturnBoard):-
       
       isPieceCPU(Elem),
         
       RowL is Row - 1,
       RowLL is Row + 1,
       RowR is Row - 2,
       RowRR is Row + 2,
       
       getMatrixElemAt(RowL,Col,Board,ElemLeft),
       testValidPiecesCPU(ElemLeft,Ret),       
       
       getMatrixElemAt(RowLL,Col,Board,ElemLefterLeft),
       testValidPiecesCPU(ElemLefterLeft,Ret),      
       
       getMatrixElemAt(RowR,Col, Board, ElemRight),
       testValidPiecesCPU(ElemRight,Ret),      
       
       getMatrixElemAt(RowRR,Col, Board, ElemRighterRight),
       testValidPiecesCPU(ElemRighterRight,Ret),
       
       Ret == valido,
       
       setMatrixElemAtWith(Row,Col,'CPUsquare',Board,Board1),
       setMatrixElemAtWith(RowL,Col,'CPUsquare',Board1,Board2),
       setMatrixElemAtWith(RowLL,Col,'CPUsquare',Board2,Board3),
       setMatrixElemAtWith(RowR,Col,'CPUsquare',Board3,Board4),
       setMatrixElemAtWith(RowRR,Col,'CPUsquare',Board4,Board5),
       
       imprimeBoard(Board5),nl,
       
       ReturnBoard = Board5 , !.

testDiagonalLeftLine(Row,Col,Board,Elem, ReturnBoard):-
       
       isPiecePlayer(Elem),
        
       RowR is Row + 1,
       ColU is Col + 1,
       RowRR is Row + 2,
       ColUU is Col + 2,
       
       RowL is Row - 1,
       ColB is Col - 1,
       RowLL is Row - 2,
       ColBB is Col - 2,
       
       getMatrixElemAt(RowR,ColU,Board,ElemRightUp),
       testValidPiecesPlayer(ElemRightUp,Ret),       
       
       getMatrixElemAt(RowRR,ColUU,Board,ElemRighterUpper),
       testValidPiecesPlayer(ElemRighterUpper,Ret),        
       
       getMatrixElemAt(RowL,ColB, Board, ElemLeftBottom),
       testValidPiecesPlayer(ElemLeftBottom,Ret),      
       
       getMatrixElemAt(RowLL,ColBB, Board, ElemLefterBottom),
       testValidPiecesPlayer(ElemLefterBottom,Ret),
       
       Ret == valido,
       
       setMatrixElemAtWith(Row,Col,'playersquare',Board,Board1),
       setMatrixElemAtWith(RowR,ColU,'playersquare',Board1,Board2),
       setMatrixElemAtWith(RowRR,ColUU,'playersquare',Board2,Board3),
       setMatrixElemAtWith(RowL,ColB,'playersquare',Board3,Board4),
       setMatrixElemAtWith(RowLL,ColBB,'playersquare',Board4,Board5),
       
       ReturnBoard = Board5 , !.

testDiagonalLeftLine(Row,Col,Board,Elem, ReturnBoard):-
        
       isPieceCPU(Elem), 
        
       RowR is Row + 1,
       ColU is Col + 1,
       RowRR is Row + 2,
       ColUU is Col + 2,
       
       RowL is Row - 1,
       ColB is Col - 1,
       RowLL is Row - 2,
       ColBB is Col - 2,
       
       getMatrixElemAt(RowR,ColU,Board,ElemRightUp),
       
       testValidPiecesCPU(ElemRightUp,Ret),     
       
       getMatrixElemAt(RowRR,ColUU,Board,ElemRighterUpper),
       
       testValidPiecesCPU(ElemRighterUpper,Ret),        
       
       getMatrixElemAt(RowL,ColB, Board, ElemLeftBottom),
       
       testValidPiecesCPU(ElemLeftBottom,Ret),
       
       getMatrixElemAt(RowLL,ColBB, Board, ElemLefterBottom),
       
       testValidPiecesCPU(ElemLefterBottom,Ret),
       
       Ret == valido,
       
       setMatrixElemAtWith(Row,Col,'CPUsquare',Board,Board1),
       setMatrixElemAtWith(RowR,ColU,'CPUsquare',Board1,Board2),
       setMatrixElemAtWith(RowRR,ColUU,'CPUsquare',Board2,Board3),
       setMatrixElemAtWith(RowL,ColB,'CPUsquare',Board3,Board4),
       setMatrixElemAtWith(RowLL,ColBB,'CPUsquare',Board4,Board5),
       
       ReturnBoard = Board5 , !.

testDiagonalRightLine(Row,Col,Board,Elem, ReturnBoard):-
        
       isPiecePlayer(Elem),
        
       RowR is Row - 1,
       ColU is Col + 1,
       RowRR is Row - 2,
       ColUU is Col + 2,
       
       RowL is Row + 1,
       ColB is Col - 1,
       RowLL is Row + 2,
       ColBB is Col - 2,
       
       getMatrixElemAt(RowR,ColU,Board,ElemLeftBottom),
       testValidPiecesPlayer(ElemLeftBottom,Ret),       
       
       getMatrixElemAt(RowRR,ColUU,Board,ElemLefterBottomer),
       testValidPiecesPlayer(ElemLefterBottomer,Ret),       
       
       getMatrixElemAt(RowL,ColB, Board, ElemRightUp),
       testValidPiecesPlayer(ElemRightUp,Ret),
       
       getMatrixElemAt(RowLL,ColBB, Board, ElemRighterUpper),
       testValidPiecesPlayer(ElemRighterUpper,Ret),
       
       Ret == valido,
       
       setMatrixElemAtWith(Row,Col,'playersquare',Board,Board1),
       setMatrixElemAtWith(RowR,ColU,'playersquare',Board1,Board2),
       setMatrixElemAtWith(RowRR,ColUU,'playersquare',Board2,Board3),
       setMatrixElemAtWith(RowL,ColB,'playersquare',Board3,Board4),
       setMatrixElemAtWith(RowLL,ColBB,'playersquare',Board4,Board5),
       
       ReturnBoard = Board5 , !.

testDiagonalRightLine(Row,Col,Board,Elem, ReturnBoard):-
        
       isPieceCPU(Elem),
        
       RowR is Row - 1,
       ColU is Col + 1,
       RowRR is Row - 2,
       ColUU is Col + 2,
       
       RowL is Row + 1,
       ColB is Col - 1,
       RowLL is Row + 2,
       ColBB is Col - 2,
       
       getMatrixElemAt(RowR,ColU,Board,ElemLeftUp),
       testValidPiecesCPU(ElemLeftUp,Ret),    
       
       getMatrixElemAt(RowRR,ColUU,Board,ElemLefterUpper),
       testValidPiecesCPU(ElemLefterUpper,Ret),      
       
       getMatrixElemAt(RowL,ColB, Board, ElemRightBottom),
       testValidPiecesCPU(ElemRightBottom,Ret),       
       
       getMatrixElemAt(RowLL,ColBB, Board, ElemRighterBottom),
       testValidPiecesCPU(ElemRighterBottom,Ret),
       
       Ret == valido,
       
       setMatrixElemAtWith(Row,Col,'CPUsquare',Board,Board1),
       setMatrixElemAtWith(RowR,ColU,'CPUsquare',Board1,Board2),
       setMatrixElemAtWith(RowRR,ColUU,'CPUsquare',Board2,Board3),
       setMatrixElemAtWith(RowL,ColB,'CPUsquare',Board3,Board4),
       setMatrixElemAtWith(RowLL,ColBB,'CPUsquare',Board4,Board5),
       
       ReturnBoard = Board5 , !.

testShapes(Row,Col,Board,Elem,RetBoard):-
        testPlusShape(Row,Col,Board,Elem, TempBoard),
        RetBoard = TempBoard, !.

testShapes(Row,Col,Board,Elem,RetBoard):-
        testCrossShape(Row,Col,Board,Elem, TempBoard),
        RetBoard = TempBoard, !.

testShapes(Row,Col,Board,Elem,RetBoard):-
        testVerticalLine(Row,Col,Board,Elem, TempBoard),
        RetBoard = TempBoard, !.

testShapes(Row,Col,Board,Elem,RetBoard):-
        testHorizontalLine(Row,Col,Board,Elem, TempBoard),
        RetBoard = TempBoard, !.

testShapes(Row,Col,Board,Elem,RetBoard):-
        testDiagonalLeftLine(Row,Col,Board,Elem, TempBoard),
        RetBoard = TempBoard, !.

testShapes(Row,Col,Board,Elem,RetBoard):-
        testDiagonalRightLine(Row,Col,Board,Elem, TempBoard),
        RetBoard = TempBoard, !.


%index -> posiçao absoulta na matrix (index = 5 significa 1ª linha 5ª coluna) 
%1. Row 2. Col 3. Board 4.Elem 5. Index 6. ReturnBoard
%navigateMatrix(Board,64,ResultingBoard):-
%%        RetBoard = ResultingBoard,
%        write('end'),nl.

navigateMatrix([],_,_,Board,Board):-
        !.

navigateMatrix([H|T],Index,RetIndexOriginal,Board,RetBoard):-
        headMatrix(H,Index,RetIndex,Board,ReturnBoard),
        Index1 is RetIndex,
        navigateMatrix(T,Index1,RetIndexOriginal,ReturnBoard,RetBoard).

headMatrix([],Index,Index,Board,Board):-
        !.

headMatrix([H|T],Index,RetIndex,Board,ReturnBoard):-
        H == 'player1X',
        ElemRow is Index // 8,
        ElemCol is Index rem 8,
        testShapes(ElemRow,ElemCol,Board,H,RetBoard),
        Index1 is Index + 1,
        headMatrix(T,Index1,RetIndex,RetBoard,ReturnBoard), !.

headMatrix([H|T],Index,RetIndex,Board,ReturnBoard):-
        H == 'CPU2X',
        ElemRow is Index // 8,
        ElemCol is Index rem 8,
        testShapes(ElemRow,ElemCol,Board,H,RetBoard),
        Index1 is Index + 1,
        headMatrix(T,Index1,RetIndex,RetBoard,ReturnBoard), !.

headMatrix([H|T],Index,RetIndex,Board,ReturnBoard):-
        H == 'whitePiece',
        ElemRow is Index // 8,
        ElemCol is Index rem 8,
        testShapes(ElemRow,ElemCol,Board,H,RetBoard),
        Index1 is Index + 1,
        headMatrix(T,Index1,RetIndex,RetBoard,ReturnBoard), !.

headMatrix([H|T],Index,RetIndex,Board,ReturnBoard):-
        H == 'squarePlayerOverlap',
        ElemRow is Index // 8,
        ElemCol is Index rem 8,
        testShapes(ElemRow,ElemCol,Board,H,RetBoard),
        Index1 is Index + 1,
        headMatrix(T,Index1,RetIndex,RetBoard,ReturnBoard), !.

headMatrix([H|T],Index,RetIndex,Board,ReturnBoard):-
        H == 'squareCPUOverlap',
        ElemRow is Index // 8,
        ElemCol is Index rem 8,
        testShapes(ElemRow,ElemCol,Board,H,RetBoard),
        Index1 is Index + 1,
        headMatrix(T,Index1,RetIndex,RetBoard,ReturnBoard), !.

headMatrix([_|T],Index,RetIndex,Board,ReturnBoard):-
        Index1 is Index + 1,
        headMatrix(T,Index1,RetIndex,Board,ReturnBoard), !.

                                   
findPiece([],Player,CPU,Player1,CPU):-
        Player1 = Player.

              
        %write('valor que vai de RetPlayer quando findPiece acaba: '),write(RetPlayer),nl,
        %write('valor que vai de Player quando findPiece acaba: '),write(Player),nl.

                     
findPiece([H|T],Player,CPU,RetP,RetC):-
       findInHead(H,Player,CPU,Player1,CPU1),
       RetPlayer = Player1,
       RetCPU = CPU1,
       findPiece(T,RetPlayer,RetCPU,RetP,RetC).

findInHead([],Player,CPU,Player,CPU).

findInHead([H|T],Player,CPU,RetPlayer,RetCPU):-
        H == 'CPUsquare',
        CPURet is CPU + 1,
        findInHead(T,Player,CPURet,RetPlayer,RetCPU).

findInHead([H|T],Player,CPU,RetPlayer,RetCPU):-
        H == 'squareCPUOverlap',
        CPURet is CPU + 1,
        findInHead(T,Player,CPURet,RetPlayer,RetCPU).

findInHead([H|T],Player,CPU,RetPlayer,RetCPU):-
        H == 'playersquare',
        PlayerRet1 is Player + 1,
        findInHead(T,PlayerRet1,CPU,RetPlayer,RetCPU).

findInHead([H|T],Player,CPU,RetPlayer,RetCPU):-
        H == 'squarePlayerOverlap',
        PlayerRet1 is Player + 1,
        findInHead(T,PlayerRet1,CPU,RetPlayer,RetCPU).

findInHead([_|T],Player,CPU,RetPlayer,RetCPU):-
        findInHead(T,Player,CPU,RetPlayer,RetCPU).

accountPlayerX([],X,X).

accountPlayerX([H|T],X,RetX):-
        findPlayerX(H,X,ReturnX),
        X1 is ReturnX,
        accountPlayerX(T,X1,RetX).

findPlayerX([],X,X).

findPlayerX([H|T],X,RetX):-
        H == 'player1X',
        X1 is X + 1,
        findPlayerX(T, X1, RetX).

findPlayerX([H|T],X,RetX):-
        H == 'squareCPUOverlap',
        X1 is X + 1,
        findPlayerX(T, X1, RetX).

findPlayerX([_|T],X,RetX):-
        findPlayerX(T, X, RetX).

accountCPUX([],X,X).

accountCPUX([H|T],X,RetX):-
        findCPUX(H,X,ReturnX),
        X1 is ReturnX,
        accountCPUX(T,X1,RetX).

findCPUX([],X,X).

findCPUX([H|T],X,RetX):-
        H == 'CPU2X',
        X1 is X + 1,
        findCPUX(T, X1, RetX).

findCPUX([H|T],X,RetX):-
        H == 'squarePlayerOverlap',
        X1 is X + 1,
        findCPUX(T, X1, RetX).

findCPUX([_|T],X,RetX):-
        findCPUX(T, X, RetX).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% WHITE PIECE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% WHITE PIECE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% WHITE PIECE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
accountWhitePieces([],X,X).

accountWhitePieces([H|T],X,RetX):-
        findWhitePiece(H,X,Ret),
        X1 is Ret,
        accountWhitePieces(T,X1,RetX).

findWhitePiece([],X,X).

findWhitePiece([H|T],X,RetX):-
        H == 'whitePiece',
        X1 is X + 1,
        findWhitePiece(T,X1,RetX).

findWhitePiece([_|T],X,RetX):-
        findWhitePiece(T,X,RetX).


initialBoard([
         ['free','free','free','free','free','free','free','free'],
         ['free','free','free','free','free','free','free','free'],
         ['free','free','free','free','free','free','free','free'],
         ['free','free','free','free','free','free','free','free'],
         ['free','free','free','free','free','free','free','free'],
         ['free','free','free','free','free','free','free','free'],
         ['free','free','free','free','free','free','free','free'],
         ['free','free','free','free','free','free','free','free']]).

intermediateBoard([
         ['free','whitePiece','free','CPU2X','free','CPU2X','whitePiece','free'],
         ['CPU2X','free','CPUsquare','free','playersquare','CPUsquare','free','free'],
        ['free','free','CPU2X','CPUsquare','playersquare','CPUsquare','free','free'],
         ['free','free','free','free','CPUsquare','free','free','free'],
         ['free','player1X','player1X','playersquare','playersquare','playersquare','free','free'],
        ['whitePiece','free','free','free','free','playersquare','free','free'],
         ['free','whitePiece','free','free','player1X','player1X','free','free'],
         ['CPU2X','free','free','CPU2X','free','whitePiece','free','free']]).

endBoard([
         ['free','whitePiece','free','CPU2X','free','CPU2X','whitePiece','free'],
         ['CPU2X','playersquare','CPUsquare','free','playersquare','CPUsquare','free','free'],
         ['free','playersquare','CPU2X','CPUsquare','playersquare','CPUsquare','free','free'],
         ['free','free','playersquare','free','CPUsquare','free','free','free'],
         ['free','player1X','player1X','playersquare','playersquare','playersquare','free','free'],
         ['whitePiece','free','playersquare','playersquare','playersquare','playersquare','free','free'],
         ['free','whitePiece','free','free','player1X','player1X','free','free'],
         ['CPU2X','free','free','CPU2X','free','whitePiece','free','free']]).
        
        