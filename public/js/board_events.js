var firebutton  = document.getElementById('playerShot');
var coords      = document.getElementById('player');
var shot        = document.getElementById('player');
var player1     = document.getElementById("tableP");
var player2     = document.getElementById("tableOp"); 

//Stores the ships locations
var carShip     = [];
var batShip     = [];
var cruShip     = [];
var subShip     = [];
var desShip     = [];
//Colors to draw ships
var shipColors  = ["blue","green","black","brown","pink","red","orange"];

var createdBoard = {}
var socket = io();
var globalMyUserName = "";

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

    // createBoard();
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

socket.on('connect', (data)=>{
    //alert('I have connected!');
})

firebutton.addEventListener('click', ()=>{
    const buildMessage = {
        'coordinates': coords.value,
        'playerName': 'PlayerExample'
    }
    socket.emit('fire',{
        //Will send to the server
        message: buildMessage
    });
});

socket.on('fire', (data)=>{
    //a respone from the server
    console.log(data.message.message.coordinates);
    //used the object that was passed into function.
    document.getElementById(data.message.message.coordinates).style.backgroundColor = "red";
});

function drawShips(ship, storedship){
    //generates a random color for battleships.
    var randomNum   = Math.floor(Math.random() * 7);
    var color       = shipColors[randomNum];
    var temp = ship.split(",");
    for(var i = 0; i < temp.length; i++){
        storedship.push(temp[i]);
        document.getElementById(temp[i]).style.backgroundColor = color;
    }
}