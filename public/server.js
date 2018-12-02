var express = require('express');
var bodyParser = require('body-parser');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.setMaxListeners(2);

//Global Variable
var globalIsPlayerTurn = true;
var globalLastPlayerToJoin = "";
const PLAYER_WINS = 0;
//This will be our in memory data storage
peopleinGame = [];
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
        client.emit('connect',{
            message: 'hello '
        })
    })

    client.on('join', (data)=>{
        console.log(data);
    });

    client.on('fire',(shootData)=>{
        client.broadcast.emit('fire',{
            message: shootData,
            hit: isTargetHit(shootData)
        });
    });
});

//IO Functions
function isTargetHit(shootData){

    const target = shootData.message.playerName;
    const coords = shootData.message.coordinates;
    var result = false;

    for(var player in peopleinGame){
        if(target != peopleinGame[player].playerName){
            peopleinGame[player].isPlayerTurn = false;
        }
        if(target == peopleinGame[player].playerName){
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
//End IO Functions

//Express Routes
app.get('/', (req,res) => {
    res.sendFile("index.html");
});

app.post('/create_board_state', (req,res)=>{
    peopleinGame.push({
        'playerName': req.body.playerName,
        'carrier': req.body.destroyer.split(','),
        'battleship': req.body.battleship.split(','),
        'cruiser': req.body.cruiser.split(','),
        'submarine': req.body.submarine.split(','),
        'destroyer': req.body.destroyer.split(','),
        'isPlayerTurn': globalIsPlayerTurn,
        'numberOfWins': PLAYER_WINS
    });

    globalIsPlayerTurn = false;
    globalLastPlayerToJoin = req.body.playerName;
    res.redirect('/html/board.html');
});

app.get('/number_of_wins', (req,res)=>{
    for(var player in peopleinGame){
        if(req.query.playerName == peopleinGame[player].playerName){
            res.send(peopleinGame[player].numberOfWins);
        }
    }
});
//End Express Routes


const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening port ${port}`));