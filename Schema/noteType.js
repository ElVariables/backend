const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    task: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
        select: false,
    },
});

module.exports = mongoose.model('note', noteSchema);
