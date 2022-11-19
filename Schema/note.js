const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    // author: {
    //     type: String,
    //     require: true,
    //     select: false,
    // },
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
