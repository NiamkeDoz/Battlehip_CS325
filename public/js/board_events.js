var $window = $(window);
var firebutton = document.getElementById('playerShot');
var coords = document.getElementById('player');
var socket = io();

firebutton.addEventListener('click', ()=>{
    socket.emit('fire',{
        
        message: coords.value
    });
});

socket.on('fire', (data)=>{
    console.log(data);

});