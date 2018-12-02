// import io from 'socket.io-client'


const socket = io()
var firebutton  = document.getElementById('playerShot');
var coords      = document.getElementById('player');
var shot        = document.getElementById('player');
var player1     = document.getElementById("tableP");
var player2     = document.getElementById("tableOp"); 
var counter     = 0;
//Stores the ships locations
var carShip     = [];
var batShip     = [];
var cruShip     = [];
var subShip     = [];
var desShip     = [];
//Colors to draw ships
var shipColors  = ["blue","#00ff21","#898989","#b200ff","pink","red","#ffae00"];

var createdBoard = {}
// var socket = io();
var globalMyUserName = "";
//If the shot is a hit then we shouldn't allow them to shoot that same position again
var globalHitSpots = [];
//The total number of avaiable shots, every time they are hit we will decrement
//the first person to have their shots at 0 lose
var totalShipSpots = 17;

//these will be used to translate the values from A-J to L-T
const translateCoords = {'K': 'A', 'L': 'B', 'M': 'C', 'N': 'D', 'O': 'E', 'P': 'F', 'Q': 'G', 'R': 'H', 'S': 'I', 'T': 'J' }

firebutton.addEventListener('click', ()=>{
    socket.emit('fire',{
        //Will send to the server
        playerName: globalMyUserName,
        coordiantes: coords.value,
    });
});

function emitBoardState(){
    //First we gather the data inputed by the user and cache it to our local variable object
    createdBoard["playerName"] = document.forms["createUserBoard"]["playerName"].value;
    createdBoard["carrier"] = document.forms["createUserBoard"]["carrier"].value;
    createdBoard["battleship"] = document.forms["createUserBoard"]["battleship"].value;
    createdBoard["cruiser"] = document.forms["createUserBoard"]["cruiser"].value;
    createdBoard["submarine"]= document.forms["createUserBoard"]["submarine"].value;
    createdBoard["destroyer"]= document.forms["createUserBoard"]["destroyer"].value;
    //This line is where you would validate your data
    //Now that the data has be cached to our object variable we can stop displaying or modal
    document.getElementById('myModal').style.display = 'none';
    //We save our userName created to globalMyUserName so it can be referred to later
    globalMyUserName = createdBoard["playerName"]
    //Finally we emit a create_board_state from the client and send the event to our server
    socket.emit('create_board_state',{
        board: createdBoard
    });
}


//we don't need to accept any data coming back as we have it already saved in our local variables
//The server will be emiting a signal only to the person that has called it and not to everyone else
//We don't emit to everyone because we would be remaking our board
socket.on('create_board_state', ()=>{
    //alert('You should have implemented this function!');
    drawShips(createdBoard["carrier"],carShip);
    drawShips(createdBoard["battleship"],batShip);
    drawShips(createdBoard["cruiser"],cruShip);
    drawShips(createdBoard["submarine"],subShip);
    drawShips(createdBoard["destroyer"],desShip);
});

// socket.on('connect', (data)=>{
//     console.log(data);
// })

socket.on('fire', (data)=>{
    checkIfHit(data);
});

function checkIfHit(data){
    // var myBoard = document.getElementById("tableP");
    var x = data.message.coordiantes.toUpperCase();

    var coordinateMarker = document.getElementById(x);
    if(Boolean(data.hit)){
        //First we update the attacked player that they have been hit by taking away one from their totalShipSpots
        totalShipSpots --;
        //Next we need to update our board with where the hit was at
        coordinateMarker.style.backgroundColor = "green";
        //Finally we notify the attacking player that their attack has succeeded
        notfiyPlayer(data);
    }
    else{
        coordinateMarker.style.backgroundColor = "black";
        //We still must notify the opponent so they can update their board
        notfiyPlayer(data);
    }
}

function notfiyPlayer(data){
    var translatedValue = beginTranslation(data.message.coordiantes.toUpperCase());
 
    socket.emit("updateBoard", {
        coord: translatedValue,
        hit: data.hit
    });
}

socket.on("updateBoard", (data)=>{
    console.log(data);
    var x = data.data.coord.toUpperCase();
    var coordinateMarker = document.getElementById(x);
    document.getElementById("message").style.display = "inline";
    if(Boolean(data.data.hit)){
        //First we update the attacked player that they have been hit by taking away one from their totalShipSpots
        //Next we need to update our board with where the hit was at
        coordinateMarker.style.backgroundColor = "green";
        document.getElementById("message").innerHTML = "HIT";
        //Finally we notify the attacking player that their attack has succeeded
    }
    else{
        coordinateMarker.style.backgroundColor = "black";
        document.getElementById("message").innerHTML = "MISS";
        //We still must notify the opponent so they can update their board
    }  
})


function beginTranslation(coord){
    concatedAnswer = getKeyByValue(translateCoords,coord.slice(0,1));
    concatedAnswer += coord.replace( /^\D+/g, '');
    return concatedAnswer;
}

//Function from https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

function drawShips(ship, storedship){
    //generates a random color for battleships.
    //var randomNum   = Math.floor(Math.random() * 7);
    var color       = shipColors[counter];
    var temp = ship.split(",");
    for(var i = 0; i < temp.length; i++){
        storedship.push(temp[i]);
        document.getElementById(temp[i]).style.backgroundColor = color;
    }
    counter++;
}