const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
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

module.exports = mongoose.model('Task', TaskSchema);
