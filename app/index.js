const express = require('express');
const app = express();

app.use(express.static('src'));
app.use(express.static('build/contracts'));

app.get('/', function(req, res){
    res.render('index.html');
});

app.listen(3500, function () {
    console.log('Example app running on port 3500!');
});