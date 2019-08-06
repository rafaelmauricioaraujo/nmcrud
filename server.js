const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://araujo:21nael24@cluster0-tpni9.mongodb.net/test?retryWrites=true&w=majority';
const ObjectId = require('mongodb').ObjectId;
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

//maneira fornecida diretamente pelo Mongo Atlas

//const client = new MongoClient(uri, { useNewUrlParser: true });
//client.connect(function (err, client) {
//  collection = client.db("test").collection("data");
//
//  app.listen(3000, function(){
//    console.log('Server running on port 3000');
//    })
//  
//});

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client){
    if(err){
        return console.log(err);
    }
    db = client.db('test')

    app.listen(port, function(){
        console.log('Server running on port',port);
    });
});

app.get('/', function(req, res){
    res.render('index.ejs')
});

app.get('/', function(req, res){
    let cursor = db.collection('data').find()
});

app.get('/show', function(req, res){
    db.collection('data').find().toArray(function(err, results){
        if(err){
            return console.log(err);
        }
        console.log("acessando lista de dados da collections")
        res.render('show.ejs',{data:results})
    })
})

app.post('/show', function(req, res){
    db.collection.save(req.body, function(err, result){
        if(err){
            return console.log(err);
        }
        console.log('salvo no banco de dados');
        res.redirect('/show');        
    });
});

app.route('/edit/:id')
.get(function(req, res){
    let id = req.params.id

    db.collection('data').find(ObjectId(id)).toArray(function(err, result){
        if(err){
            return res.send(err);
        }
        res.render('edit.ejs', {data: result});
    })
})

.post(function(req, res){
    let id = req.params.id;
    let name = req.body.name;
    let surname = req.body.surname;

    db.collection('data').updateOne({_id:ObjectId(id)},{
        $set:{
            name:name,
            surname:surname
        }
    }, function(err, result){
        if(err){
            return res.send(err)
        }
        res.redirect('/show')
        console.log('Atualizado no banco de dados');
    })
})

app.route('/delete/:id')
.get(function(req, res){
    let id = req.params.id;
    db.collection('data').deleteOne({_id:ObjectId(id)}, function(err, result){
        if(err){
            return res.send(500, err);
        }
        console.log('Registro deletado no banco de dados');
        res.redirect('/show')
    })
})
