var express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//Global Variable to set first oppenent to create game to attack first
var globalIsPlayerTurn = true;

//This will be our in memory data storage
peopleinGame = [];

//For testing purposes delete when we submit
testPlayerData = {
    'playerName': 'testPlayer',
    'carrier': ['A1', 'A2', ,'A3','A4','A5'], //5
    'battleship': ['B1', 'B2', 'B3', 'B4'], //4
    'cruiser': ['C1','C2','C3'], //3
    'submarine': ['D1','D2','D3'], //3
    'destroyer': ['E1','E2'] //2
}
peopleinGame.push(testPlayerData);
//END of testing purposes

app.get('/', (req,res) => {
    res.sendFile("index.html");
});

app.get('/attack', (req,res)=>{
    var opponentToAttack = req.query.opponentToAttack;
    var attackPoint = req.query.attackPoint;
    for(var player in peopleinGame){
        //disable the player ability who attacked to attack again
        if(opponentToAttack != peopleinGame[player].playerName){
            peopleinGame[player].isPlayerTurn = false;
        }
        if(opponentToAttack == peopleinGame[player].playerName){
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

app.get('/isMyTurn', (req,res)=>{
    var playerName = req.query.playerName;
    for(var player in peopleinGame){
        if(playerName == peopleinGame[player]){
            res.send(peopleinGame[player].isPlayerTurn)
        }
    }
    res.send("Player couldn't be found");
});


app.post('/deadShip', (req,res)=>{
    /**If a players ship has been killed then that ships coords no longer matter */
    
});


app.post('/createGame', (req,res) =>{
    peopleinGame.push({
        'playerName': req.query.playerName,
        'carrier': req.query.destroyer,
        'battleship': req.query.battleship,
        'cruiser': req.query.cruiser,
        'submarine': req.query.submarine,
        'destroyer': req.query.destroyer,
        'isPlayerTurn': globalIsPlayerTurn
    });
    globalIsPlayerTurn = false;
    res.send(req.query.playerName + 'game has been created.');
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening port 3000"));