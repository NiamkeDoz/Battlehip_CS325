var firebutton  = document.getElementById('playerShot');
var coords      = document.getElementById('player');
var shot        = document.getElementById('player').value;
var player1     = document.getElementById("tableP");
var player2     = document.getElementById("tableOp"); 



var createdBoard = {}
var socket = io();

function cacheData(){
    //This data is from the index.html and will be used to build the board for board.html
    //we'll append each key value to the createdBoard object
    createdBoard["playerName"] = document.forms["createUserBoard"]["playerName"].value;
    createdBoard["carrier"] = document.forms["createUserBoard"]["carrier"].value;
    createdBoard["battleship"] = document.forms["createUserBoard"]["battleship"].value;
    createdBoard["cruiser"] = document.forms["createUserBoard"]["cruiser"].value;
    createdBoard["submarine"]= document.forms["createUserBoard"]["submarine"].value;
    createdBoard["destroyer"]= document.forms["createUserBoard"]["destroyer"].value;
    //Now we can build our board when the connection event happens


}

window.onload = function(){
    var http = new XMLHttpRequest();

    http.onreadystatechange = function(){
        if(http.readyState == 4 && http.status == 200){
            console.log(http.response);
        }
    }

    http.open('GET', 'public/index.html', true);
    http.send();
}


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