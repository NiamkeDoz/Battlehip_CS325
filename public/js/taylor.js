var hitlist=[];
var text = "";
var coordinates = document.getElementById("player").value;;
function createList() {
    text="";
    var coordinates = document.getElementById("player").value;
    hitlist.push(coordinates);
    
    for(var i = 0; i < hitlist.length; i++){
        text += hitlist[i] + ",  ";
    }
    document.getElementById("listArea").innerText = text;
}
