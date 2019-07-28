const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://araujo:21nael24@cluster0-tpni9.mongodb.net/test?retryWrites=true&w=majority';

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

/////maneira fornecida diretamente pelo Mongo Atlas

//const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://araujo:21nael24@cluster0-tpni9.mongodb.net/test?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true });
//client.connect(err => {
//  const collection = client.db("test").collection("devices");
//  // perform actions on the collection object
//  client.close();
//});

MongoClient.connect(uri, function(err, client){
    if(err){
        return console.log(err);
    }
    db = client.db('test').collection('devices');
    
    app.listen(3000, function(){
        console.log('Server running on port 3000');
    });
});

app.get('/', function(req, res){
    res.render('index.ejs')
});

app.post('/show', function(req, res){
    console.log(req.body)
});
