
var hitlist = [];

function createList() {
    var coordinates = document.getElementById("input").value;
    hitlist.push(coordinates);
    var text = "";
    for(var i = 0; i < hitlist.length; i++){
        text += hitlist[i] + "<br>";
    }
    document.getElementById("listArea").innerHTML = text;
   
}