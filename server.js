const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/show', function(req, res){
    res.render('index.ejs');
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});
