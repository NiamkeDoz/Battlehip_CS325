var express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


player = {
    'playerName': null,
    'airCraftPosition': null,
    'battleShipPosition': null,
    'destroyerPosition': null,
    'submarinePosition': null,
    'patrolboatPosition': null
};

opponent = {
    'opponentName': null,
    'airCraftPosition': null,
    'battleShipPosition': null,
    'destroyerPosition': null,
    'submarinePosition': null,
    'patrolboatPosition': null
};

app.get('/', (req,res) => {
    res.send('Hello from js')
});

app.put('/attack', (req,res)=>{
    var attackPoint = req.attackPoint;
    res.send("This is working");
    // var playerName = req.playerName;
    // var shipPosition = req.shipPosition
    // var shipType = req.shipType;
})

// Position params will be taken as an x and y and the ship
app.post('/createGame', (req,res) =>{
    // var playerName = req.query.playerName;
    var playerBoard = req.query.playerBoard;
    res.send(playerBoard);
    // var data = req.params;
    // var playerName = data.playerName;
    // var ship = data.battleShip;
    // var shipPositionX = data.shipPositionX;
    // var shipPositionY = data.shipPositionY;
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening port 3000"));