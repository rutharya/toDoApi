//This is the v2 of the server code... we will add express to do the routing.
var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT | 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    //console.log(req.body);
    todo.save().then((doc) => {
        res.status(200).send(doc);
    }, (e) => {
        // console.log(`ERRROR!! ${e}`);
        res.status(400).send(e);
    })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos })
    }, (e) => {
        res.status(400).send({ e });
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send({
            error: 'id not valid'
        });
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({
            todo
        })
    }, (e) => {
        res.status(400).send({ e });
    })
});

app.listen(port, () => {
    console.log(`App started of port ${port}`);
})

module.exports = { app };