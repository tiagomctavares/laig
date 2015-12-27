%Ficha 5
%Exercicio_1
a(x):-b(x), c(x), !, d(x), e(x).
a(x):-f(x), g(x).

b(1).
b(2).
c(1).
c(2).
d(2).
e(2).
f(3).
f(3).



%Exercicio_2
p(1).
p(2):-!.
p(3).



%Exercicio_3
dados(um).
dados(dois).
dados(tres).

cut_teste_a(X) :-dados(X).
cut_teste_a('ultima_clausula').


cut_teste_b(X):-
dados(X), !.
cut_teste_b('ultima_clausula').


cut_teste_c(X,Y) :-dados(X),!,dados(Y).
cut_teste_c('ultima_clausula').



%Exercicio_4
max(X, Y, Z, X):-X>=Y, X>=Z, !.
max(X, Y, Z, Y):-Y>=Z, !.
max(_, _, Z, Z).


%Exercicio_5
%u([H|T],H,[H|T2]):-u(T,H,T2).
%u([H|T],X,L2):-X\=H,u(T,X,L2).

u([H|T],X,L2):-
        \+ X=H, !, 
        u(T,H,L2).

u([H|T],X,[H|T2]):-X\=H,u(T,X,T2).

u([],_,[]).

%not(X):-X,!,fail.
%not(X).


%Ficha 6

%Exercicio1

quadrado(X,Y):-Y is X*X.

duplica(X,Y) :- Y is 2*X.

map([],_,[]).

map([C|R],Transfor,[TC|CR]):-
        aplica(Transfor, [C,TC]),
        map(R,Transfor,CR).

aplica(P,LArgs) :- G =.. [P|LArgs], G.

%Exercicio2

%solução 2_1
separa(L,P,LR):-separa(L,P,L1,L2), append(L1, L2, LR).

separa([X|Xs], P, [X|L1], L2):-
        G =.. [P,X], G, !,
        separa(Xs, P, L1, L2).

separa([X|Xs], P, L1, [X|L2]):-
        separa(Xs, P, L1, L2).

separa([],_,[],[]).

%solução 2_2

%(...)

%Exercicio3

idade(maria,30).
idade(pedro,25).
idade(jose,25).
idade(rita,18).

