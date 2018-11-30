var $window = $(window);
var firebutton = document.getElementById('playerShot');
var coords = document.getElementById('player');
var shot   = document.getElementById('player').value;

var socket = io();

firebutton.addEventListener('click', ()=>{
    socket.emit('fire',{
        //Will send to the server
        message: coords.value
    });
});

socket.on('fire', (data)=>{
    //a respone from the server
    //alert(data.message.message);
    //used the object that was passed into function.
    document.getElementById(data.message.message).style.backgroundColor = "red";
});