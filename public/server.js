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
    // res.sendFile('index.html')
    res.sendFile("index.html");
});

app.put('/attack', (req,res)=>{
    var attackPoint = req.attackPoint;
    
    // var playerName = req.playerName;
    // var shipPosition = req.shipPosition
    // var shipType = req.shipType;
})


app.post('/createGame', (req,res) =>{
    // var playerName = req.query.playerName;
    var playerBoard = req.query.playerBoard;
    res.send(playerBoard);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening port 3000"));