var $window = $(window);
var firebutton = document.getElementById('playerShot');
var coords = document.getElementById('player');
var socket = io();

firebutton.addEventListener('click', ()=>{
    socket.emit('fire',{
        //Will send to the server
        message: coords.value
    });
});

socket.on('fire', (data)=>{
    //a respone from the server
    console.log(data);

});