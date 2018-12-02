var firebutton = document.getElementById('playerShot');
var coords = document.getElementById('player');

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
    alert('You should have implemented this function!');
});

socket.on('connect', (data)=>{
    console.log(data);
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
    console.log(data.hit);

});