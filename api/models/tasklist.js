const mongoose = require('mongoose');

const TasklistSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Tasklist', TasklistSchema);
