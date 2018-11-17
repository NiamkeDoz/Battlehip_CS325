var opp     = document.getElementById("tableOp");
var player  = document.getElementById("tableP");

var playerTurn = false;

var carShip   = [];
var batShip   = [];
var cruShip   = [];
var subShip   = [];
var desShip   = [];

function boardSetup(){
    var canvasP = document.getElementById("canvasP");
    var ctxP    = canvasP.getContext("2d");
    var width   = 500;
    var height  = 500;
}

function onSubmit(){
    var carrier     = document.getElementById("carrier").value;
    var battleship  = document.getElementById("battleship").value;
    var cruiser     = document.getElementById("cruiser").value;
    var submarine   = document.getElementById("submarine").value;
    var destroyer   = document.getElementById("destroyer").value;
    var hide        = document.getElementById("boardPieces");
    hide.style.display = "none";
    drawShips(carrier, carShip);
    drawShips(battleship, batShip);
    drawShips(cruiser, cruShip);
    drawShips(submarine, subShip);
    drawShips(destroyer, desShip);
}

function drawShips(ship, storedship){
    var temp = ship.split(",");
    for(var i = 0; i < temp.length; i++){
        storedship.push(temp[i]);
        document.getElementById(temp[i]).style.backgroundColor = "blue";
    }
    
}

function fire(){
    if(playerTurn != true){
        alert("Not your turn!");
    }else{
        var playerShot = document.getElementById("player").value;
        playerShot.toString().charAt(0).toUpperCase();
        document.getElementById(playerShot).style.backgroundColor = "red";
    }
    
    

}
// j = document.getElementById('tableP');
// j.addEventListener('click', ()=>{
//     console.log('hello from index.js');
// }, true);