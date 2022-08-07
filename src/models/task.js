const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
    description: String,
    completed: Boolean
});

const Task = mongoose.model("Task", TasksSchema);

module.exports = Task;

// description: {
//     type: String,
//     required: true
// },
// completed: {
//     type: Boolean,
//     default: false
// }