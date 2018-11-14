var express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


peopleinGame = [];

//we will use this because it has a predetermined values
testAgainsPlayer = {'playerName':'John', 'playerBoard': ['A3', 'B4']};
peopleinGame.push(testAgainsPlayer);

app.get('/', (req,res) => {
    res.sendFile("index.html");
});

app.post('/createGame', (req,res)=>{
    var playerName = req.query.playerName;
    var playerBoard = req.query.playerBoard;
    res.send('player ' + playerName + 'has been created');
})

app.put('/attack', (req,res)=>{
    var attackPoint = req.query.attackPoint;
    var attackingPlayer = req.query.attackingPlayer;

        //at each index there is a person object so we must itterate thorugh each one
    for(var player in peopleinGame){
        //make sure we aren't attacking ourselves
        if (attackingPlayer != peopleinGame[player].playerName){
            if(peopleinGame[player].playerBoard.includes(attackPoint)){
                res.send(true);
            }else{
                res.send(false);
            }
        }
        // res.send(peopleinGame[player].playerName);
    }
    res.send('The player you are looking for doesn\'nt exist');

})


app.post('/createGame', (req,res) =>{
    peopleinGame.push({
        'playerName': req.query.playerName,
        'playerBoard': req.query.playerBoard
    })
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening port 3000"));