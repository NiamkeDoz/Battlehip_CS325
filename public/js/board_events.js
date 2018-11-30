var firebutton = document.getElementById('playerShot');
var coords = document.getElementById('player');
var idATen = document.getElementById('A10');


var socket = io();

idATen.addEventListener('click', ()=>{
    socket.emit('go', {
        message: 'pong'
    });
});

socket.on('go', (data)=>{
    console.log(data);
})


firebutton.addEventListener('click', ()=>{
    socket.emit('fire',{
        //Will send to the server
        message: coords.value
    });
});

socket.on('fire', (data)=>{
    //a respone from the server
    alert(data.message.message);

});