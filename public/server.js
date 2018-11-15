var express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


peopleinGame = [];

testPlayerData = {
    'playerName': 'testPlayer',
    'carrier': ['A1', 'A2', ,'A3','A4','A5'], //5
    'battleship': ['B1', 'B2', 'B3', 'B4'], //4
    'cruiser': ['C1','C2','C3'], //3
    'submarine': ['D1','D2','D3'], //3
    'destroyer': ['E1','E2'] //2
}

app.get('/', (req,res) => {
    res.sendFile("index.html");
});

app.post('/createGame', (req,res)=>{
    var playerName = req.query.playerName;
    var playerBoard = req.query.playerBoard;
    res.send('player ' + playerName + 'has been created');
})

app.get('/attack', (req,res)=>{
    var opponentToAttack = req.query.opponentToAttack;
    var attackPoint = req.query.attackPoint;

})

app.post('/deadShip', (req,res)=>{
    /**If a players ship has been killed then that ships coords no longer matter */
})


app.post('/createGame', (req,res) =>{
    peopleinGame.push({
        'playerName': req.query.playerName,
        'carrier': req.query.destroyer,
        'battleship': req.query.battleship,
        'cruiser': req.query.cruiser,
        'submarine': req.query.submarine,
        'destroyer': req.query.destroyer
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening port 3000"));