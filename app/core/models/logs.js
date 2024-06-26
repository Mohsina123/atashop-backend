const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
    eventName: String,
    level: String,
    ip: String,
    message: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const LogModel = mongoose.model('Log', LogSchema);

module.exports = LogModel;
