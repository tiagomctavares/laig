var prologConfig = {
    url: 'localhost:8081',
    urlSeparator: '/',
    protocol: 'http://',
    gameStateConstants: [
        'free',
        'player1X',
        'CPU2X',
        'playersquare',
        'CPUsquare',
        'whitePiece',
        'squarePlayerOverlap',
        'squareCPUOverlap',
        'playerTurn',
        'cpuTurn'
    ],
    prologSpecialConstants: {
        'CPU2X': "'CPU2X'",
        'CPUsquare': "'CPUsquare'"
    },
};

var gameConstants = {
    'EMPTY_CELL': "free",
    "PLAYER1PIECE": "player1X",
    "PLAYER2PIECE": "CPU2X",
    'PLAYER1SCORE': "playersquare",
    'PLAYER2SCORE': "CPUsquare",
    'WHITE_PIECE': "whitePiece"
};