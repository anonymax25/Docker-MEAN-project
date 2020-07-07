const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: String,
    days: Number
});

module.exports = mongoose.model('task', TaskSchema);
