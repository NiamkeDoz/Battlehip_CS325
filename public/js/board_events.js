var firebutton = document.getElementById('playerShot');
var coords = document.getElementById('player');

var socket = io();


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