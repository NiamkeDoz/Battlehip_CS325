var opp     = document.getElementById("tableOp");
var player  = document.getElementById("tableP");

var playerTurn = false;

//Stores the ships locations
var carShip     = [];
var batShip     = [];
var cruShip     = [];
var subShip     = [];
var desShip     = [];
var gameBoard   = [];
var numOfShips  = 5;
var sunkenShips = 0;
var isGameOver  = false;

//draw the ships in a different color.
var shipColors  = ["blue","green","black","brown","pink","red","orange"];

function onSubmit(){
    
    var carrier     = document.getElementById("carrier").value;
    var battleship  = document.getElementById("battleship").value;
    var cruiser     = document.getElementById("cruiser").value;
    var submarine   = document.getElementById("submarine").value;
    var destroyer   = document.getElementById("destroyer").value;
    var playerName  = document.getElementById("playerName").value;
    var hide        = document.getElementById("boardPieces");
    hide.style.display = "none";
    drawShips(carrier, carShip);
    drawShips(battleship, batShip);
    drawShips(cruiser, cruShip);
    drawShips(submarine, subShip);
    drawShips(destroyer, desShip);
    createBoard(gameBoard);
}

function createBoard(board){
    //2d Array visualization of game board.
    for(var x = 1; x < 10; x++){
        board[x] = [];
        for(var k = 1; k < 10; k++){
            board[x][k] = ".";
        }
    }
}

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

function gameStatusCheck(){
    if(sunkenShips != 5){
        isGameOver = false;
    }else{
        isGameOver = true;
        //Display winner of the Game
        alert("Game Over!");
    }
    
}

function fire(){
    var playerShot = document.getElementById("player").value;
    //playerShot.toString().charAt(0).toUpperCase();
    document.getElementById(playerShot).style.backgroundColor = "red";
}