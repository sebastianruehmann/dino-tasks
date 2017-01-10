const mongoose = require('mongoose');
const shortid = require('shortid')

const RevisionSchema = mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    created: {
        type: Date
    },
    updated: {
        type: Date
    },
    _tasklistId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tasklist'
    },
    accessKey: {
      type: String,
      'default': shortid.generate()
    }
});

module.exports = mongoose.model('Revision', RevisionSchema);
