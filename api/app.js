const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var app = express();
app.set('port', 5000);
var basePath = '/api/v1'

app.use(bodyParser.json());

var dbHost = 'mongodb://localhost/dino-tasks';
mongoose.connect(dbHost);

var TasklistSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

var TaskSchema = mongoose.Schema({
    _tasklistId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tasklist'
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    state: {
        type: String,
        enum: ['todo', 'progress', 'complete', 'canceled']
    },
    deadline: {
        type: Date
    }
})

var Tasklist = mongoose.model('Tasklist', TasklistSchema);
var Task = mongoose.model('Task', TaskSchema);

app.listen(app.get('port'), function(){
    console.log('Server up: http://localhost:' + app.get('port'));
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if ( req.method === 'OPTIONS' ) {
        res.end();
    } else {
        next();
    }
});

app.get(basePath + '/tasklists', function (req, res) {
    Tasklist.find({}, function (err, response) {
        if( err ) throw err;

        res.json(response);
    });
})

app.get(basePath + '/tasklist/:id', function (req, res) {
    Tasklist.findOne({
            '_id': req.params.id
        }, function (err, response) {
            if( err ) throw err;

            Task.find({
                '_tasklistId': req.params.id
            }).
            select('-_tasklistId').
            exec(function (err, tasksResponse) {
                response = response.toJSON();
                response.tasks = tasksResponse;

                res.json(response);
            });

        });
})

app.put(basePath + '/tasklist/:id', function (req, res) {
    Tasklist.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description
        }
    }, function (err, response) {
        if( err ) throw err;

        res.json(response);
    })
})

app.post(basePath + '/tasklists', function (req, res) {
    var newTasklist = new Tasklist({
        title: req.body.title,
        description: req.body.description
    });

    newTasklist.save(function (err, response) {
        if( err ) throw err;

        res.json(response);
    })
})

app.post(basePath + '/tasks', function (req, res) {
    const newTask = new Task({
        _tasklistId: req.body._tasklistId,
        subject: req.body.subject ? req.body.subject : '',
        description: req.body.description,
        state: req.body.state,
        deadline: req.body.deadline
    });

    newTask.save(function (err, response) {
        if( err ) throw err;

        res.json(response);
    })
})

app.put(basePath + '/task/:id', function (req, res) {
    const query = {
        subject: req.body.subject ? req.body.subject : '',
        description: req.body.description,
        state: req.body.state,
        deadline: req.body.deadline
    }

    if(typeof req.body._tasklistId !== 'undefined') {
        query._tasklistId = req.body._tasklistId
    }

    Task.findByIdAndUpdate(req.params.id, {
        $set: query
    }, function (err, response) {
        if( err ) throw err;

        res.json(response);
    })
})