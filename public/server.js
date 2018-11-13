var express = require('express');
const app = express();

app.use(express.static('public'));


app.get('/', (req,res) => {
    res.sendFile('index.html')
});


// var path = require('path');
// var app = express();

// app.use(express.static('public'))
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening port 3000"));