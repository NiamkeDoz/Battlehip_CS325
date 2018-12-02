var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('port', process.env.PORT|| 3000);
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.setMaxListeners(2);

//Global Variable
var globalIsPlayerTurn = true;
const PLAYER_WINS = 0;
peopleinGame = [];      //This will be our in memory data storage
//End Global Variables

//For testing purposes delete when we submit
testPlayerData = {
    'playerName': 'testPlayer',
    'carrier': ['A1', 'A2','A3','A4','A5'], //5
    'battleship': ['B1', 'B2', 'B3', 'B4'], //4
    'cruiser': ['C1','C2','C3'], //3print(__version__)
    'submarine': ['D1','D2','D3'], //3
    'destroyer': ['E1','E2'], //2
    'numberOfWins': PLAYER_WINS
}
peopleinGame.push(testPlayerData);
//END of testing purposes


//Handles the events submitted by the client
io.on('connect', function(client){
    console.log('Client connected...');
    client.on('connect', ()=>{
        // client.emit('connect',{
        //     message: 'hello '
        // });
    });

    client.on('join', (data)=>{
        console.log(data);
    });

    client.on('fire',(shootData)=>{
        client.broadcast.emit('fire',{
            message: shootData,
            hit: isTargetHit(shootData)
        });
    });

    client.on('create_board_state', (playerBoardData)=>{
        //First we must save the players board data into peopleInGame;
        createPlayerBoardState(playerBoardData);
        client.emit('create_board_state',{});
    });

    client.on('updateBoard', (hitData)=>{
        client.broadcast.emit('updateBoard', {
            data: hitData
        })
    });
});

//IO Functions
function isTargetHit(shootData){
    const target = shootData.playerName;
    const coords = shootData.coordiantes;
    var result = false;

    for(var player in peopleinGame){
        if(target != peopleinGame[player].playerName){
            //enable the player that was just attacked to true
            peopleinGame[player].isPlayerTurn = true;
            if(peopleinGame[player].carrier.includes(coords)){
                result = true;
            }
            else if (peopleinGame[player].battleship.includes(coords)){
                result = true;
            }
            else if(peopleinGame[player].cruiser.includes(coords)){
                result = true;
            } else if(peopleinGame[player].submarine.includes(coords)){
                result = true;
            } else if(peopleinGame[player].destroyer.includes(coords)){
                result = true;
            }
        }      
    }
    return result;
}

function addPlayerWin(playerName){
    for(var player in peopleinGame){
        if(playerName == peopleinGame[player]){
            peopleinGame[player].numberOfWins += 1;
        }
    }
}

function createPlayerBoardState(playerBoardData){
    peopleinGame.push({
        'playerName': playerBoardData.board.playerName,
        'carrier': playerBoardData.board.destroyer.split(','),
        'battleship': playerBoardData.board.battleship.split(','),
        'cruiser': playerBoardData.board.cruiser.split(','),
        'submarine': playerBoardData.board.submarine.split(','),
        'destroyer': playerBoardData.board.destroyer.split(','),
        'isPlayerTurn': globalIsPlayerTurn,
        'numberOfWins': PLAYER_WINS
    });
    globalIsPlayerTurn = false;   
}
//End IO Functions

//Express Routes
app.get('/number_of_wins', (req,res)=>{
    for(var player in peopleinGame){
        if(req.query.playerName == peopleinGame[player].playerName){
            res.send(peopleinGame[player].numberOfWins);
        }
    }
    res.send('player not found')
});
//End Express Routes

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening port ${port}`));