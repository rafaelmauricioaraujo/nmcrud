const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded(
    {extended: true}
    )
);

app.get('/show', function(req, res){
    console.log(req.body)
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});
