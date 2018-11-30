var express = require('express');
var bodyParser = require('body-parser');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.setMaxListeners(2);
//Global Variable to set first oppenent to create game to attack first
var globalIsPlayerTurn = true;

//Handles the events submitted by the client
io.on('connect', function(client){
    console.log('Client connected...');
    client.on('join', (data)=>{
        console.log(data);
    });

    client.on('fire',(coordinates)=>{
        client.broadcast.emit('fire',{
            message: coordinates
        });
    });

    client.on('go',(data)=>{
        client.broadcast.emit('go',{
            message: data.message
        });
    });
});

//This will be our in memory data storage
peopleinGame = [];

//For testing purposes delete when we submit
testPlayerData = {
    'playerName': 'testPlayer',
    'carrier': ['A1', 'A2','A3','A4','A5'], //5
    'battleship': ['B1', 'B2', 'B3', 'B4'], //4
    'cruiser': ['C1','C2','C3'], //3print(__version__)
    'submarine': ['D1','D2','D3'], //3
    'destroyer': ['E1','E2'] //2
}
peopleinGame.push(testPlayerData);
//END of testing purposes

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
        'isPlayerTurn': globalIsPlayerTurn
    });

    globalIsPlayerTurn = false;
    //Development!
    console.log(peopleinGame);
    //Delete before production
    res.redirect('/html/board.html');
});

app.put('/attack', (req,res)=>{
    var opponentToAttack = req.query.opponentToAttack;
    var attackPoint = req.query.attackPoint;
    for(var player in peopleinGame){
        //disable the player ability who attacked to attack again
        if(opponentToAttack != peopleinGame[player].playerName){
            peopleinGame[player].isPlayerTurn = false;
        }
        if(opponentToAttack == peopleinGame[player].playerName){
            console.log(opponentToAttack);
            //enable the player that was just attacked to true
            peopleinGame[player].isPlayerTurn = true;
            if(peopleinGame[player].carrier.includes(attackPoint)){
                res.send(true);
            }
            else if (peopleinGame[player].battleship.includes(attackPoint)){
                res.send(true);
            }
            else if(peopleinGame[player].cruiser.includes(attackPoint)){
                res.send(true);
            } else if(peopleinGame[player].submarine.includes(attackPoint)){
                res.send(true);
            } else if(peopleinGame[player].destroyer.includes(attackPoint)){
                res.send(true);
            }
        }
    }
    res.send("Opponent couldn't be found");
});


app.get('/getMyBoard', (req,res)=>{
    var myName = req.query.playerName;
    for(var player in peopleinGame){
        if(myName == peopleinGame[player].playerName){
            res.send(peopleinGame[player]);
        }
    }
});


const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening port ${port}`));