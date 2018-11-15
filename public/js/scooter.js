function boardSetup(){
    var canvasP = document.getElementById("canvasP");
    var ctxP    = canvasP.getContext("2d");
    var width   = 500;
    var height  = 500;
}

var opp     = document.getElementById("tableOp");
var player  = document.getElementById("tableP");

function onSubmit(){
    var carrier     = document.getElementsByName("carrier").toString();
    var battleship  = document.getElementsByName("battleship").toString();
    var cruiser     = document.getElementsByName("cruiser").toString();
    var submarine   = document.getElementsByName("submarine").toString();
    var destroyer   = document.getElementsByName("destroyer").toString();
    var hide        = document.getElementById("boardPieces");
    hide.style.display = "none";
}

function drawShips(ship){
    
}

function fire(){
    var playerShot = document.getElementById("player").value;
    playerShot.toString().charAt(0).toUpperCase();
    document.getElementById(playerShot).style.backgroundColor = "red";

}
// j = document.getElementById('tableP');
// j.addEventListener('click', ()=>{
//     console.log('hello from index.js');
// }, true);