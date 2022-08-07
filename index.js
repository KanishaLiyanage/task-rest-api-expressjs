const express = require("express");
require(__dirname + '/src/db/mongoose');

const Task = require(__dirname + '/src/models/task');
const User = require(__dirname + '/src/models/user');

const app = express();
const port = process.env.PORT || 3000;

// app.get("/", function(req,res){

// });

app.post("/users", function(req, res){
    
    const user = new User(req.body);

    user.save().then(() => {
        res.send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.post("/tasks", function(req, res){
    
    const task = new Task(req.body);

    task.save().then(() => {
        res.send(task);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(port, function(){
    console.log("Server started on port " + port + ".");
});
