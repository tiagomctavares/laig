:-use_module(library(sockets)).
:-use_module(library(lists)).
:-use_module(library(codesio)).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%                                        Server                                                   %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% To run, enter 'server.' on sicstus command line after consulting this file.
% You can test requests to this server by going to http://localhost:8081/<request>.
% Go to http://localhost:8081/quit to close server.

% Made by Luis Reis (ei12085@fe.up.pt) for LAIG course at FEUP.

port(8081).

% Server Entry Point
server :-
	port(Port),
	write('Opened Server'),nl,nl,
	socket_server_open(Port, Socket),
	server_loop(Socket),
	socket_server_close(Socket),
	write('Closed Server'),nl.

% Server Loop 
% Uncomment writes for more information on incomming connections
server_loop(Socket) :-
	repeat,
	socket_server_accept(Socket, _Client, Stream, [type(text)]),
		% write('Accepted connection'), nl,
	    % Parse Request
		catch((
			read_request(Stream, Request),
			read_header(Stream)
		),_Exception,(
			% write('Error parsing request.'),nl,
			close_stream(Stream),
			fail
		)),
		
		% Generate Response
		handle_request(Request, MyReply, Status),
		format('Request: ~q~n',[Request]),
		format('Reply: ~q~n', [MyReply]),
		
		% Output Response
		format(Stream, 'HTTP/1.0 ~p~n', [Status]),
		format(Stream, 'Access-Control-Allow-Origin: *~n', []),
		format(Stream, 'Content-Type: text/plain~n~n', []),
		format(Stream, '~p', [MyReply]),
	
		% write('Finnished Connection'),nl,nl,
		close_stream(Stream),
	(Request = quit), !.
	
close_stream(Stream) :- flush_output(Stream), close(Stream).

% Handles parsed HTTP requests
% Returns 200 OK on successful aplication of parse_input on request
% Returns 400 Bad Request on syntax error (received from parser) or on failure of parse_input
handle_request(Request, MyReply, '200 OK') :- catch(parse_input(Request, MyReply),error(_,_),fail), !.
handle_request(syntax_error, 'Syntax Error', '400 Bad Request') :- !.
handle_request(_, 'Bad Request', '400 Bad Request').

% Reads first Line of HTTP Header and parses request
% Returns term parsed from Request-URI
% Returns syntax_error in case of failure in parsing
read_request(Stream, Request) :-
	read_line(Stream, LineCodes),
	print_header_line(LineCodes),
	
	% Parse Request
	atom_codes('GET /',Get),
	append(Get,RL,LineCodes),
	read_request_aux(RL,RL2),	
	
	catch(read_from_codes(RL2, Request), error(syntax_error(_),_), fail), !.
read_request(_,syntax_error).
	
read_request_aux([32|_],[46]) :- !.
read_request_aux([C|Cs],[C|RCs]) :- read_request_aux(Cs, RCs).


% Reads and Ignores the rest of the lines of the HTTP Header
read_header(Stream) :-
	repeat,
	read_line(Stream, Line),
	print_header_line(Line),
	(Line = []; Line = end_of_file),!.

check_end_of_header([]) :- !, fail.
check_end_of_header(end_of_file) :- !,fail.
check_end_of_header(_).

% Function to Output Request Lines (uncomment the line bellow to see more information on received HTTP Requests)
% print_header_line(LineCodes) :- catch((atom_codes(Line,LineCodes),write(Line),nl),_,fail), !.
print_header_line(_).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%                                       Commands                                                  %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Require your Prolog Files here

:-include('modX.pl').

parse_input(createBoard, ResGame) :- createNewGame(ResGame).

parse_input(placeX(Row, Col, Game), ResGame) :- 
	getGameBoard(Game, Board),
	setMatrixElemAtWith(Row,Col,'whitePiece', Board, Game2),
	setGameBoard(Game2,Game,ResGame).

parse_input(playerPlay(Row, Col, Game), ResGame):- 
	getGamePlayerTurn(Game, Player),
	laig_playerPlay(Row, Col, Player, Game, ResGame).

parse_input(endGame(Game), Res):- laig_endGame(Game, Res).

parse_input(move(X, Y), Res) :- move(X, Y).
parse_input(quit, goodbye).

laig_endTurn(Game, ResGame) :-
	evaluatePlay(Game,Game3),
    assertScores(Game3,Game4),
    assertMarkers(Game4,Game5),
    assertWhitePieces(Game5,ResGame).

laig_playerPlay(Row, Col, playerTurn, Game, ResGame):-
    getGameBoard(Game, Board),        
    isOccupied(Row,Col,Board,RetElem),
    setMatrixElemAtWith(Row, Col, RetElem, Board, Game2),
    setGameBoard(Game2, Game, Game3),
    laig_endTurn(Game3, Game4),
    setGamePlayerTurn(cpuTurn,Game4,ResGame).

laig_playerPlay(Row, Col, cpuTurn, Game, ResGame):-
    getGameBoard(Game, Board),
    isOccupiedPlayer2(Row,Col,Board,RetElem),
    setMatrixElemAtWith(Row, Col, RetElem, Board, Game2),
    setGameBoard(Game2, Game, Game3),
    laig_endTurn(Game3, Game4),
    setGamePlayerTurn(playerTurn,Game4,ResGame).

laig_endGame(Game, Res) :-
    assertPieces(Game,'player1X'),
    Res = [player1X, pieces].
laig_endGame(Game, Res) :-
    assertPieces(Game,'CPU2X'),
    Res = [CPU2X, pieces].
laig_endGame(Game, Res) :-
    checkScorePlayer(Game),
    Res = [player1X, score].
laig_endGame(Game, Res) :-
    checkScorePlayer(Game),
    Res = [CPU2X, score].
laig_endGame(Game, Res) :- Res = [].
