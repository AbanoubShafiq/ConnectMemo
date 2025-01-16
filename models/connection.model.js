const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const ConnectionSchema = new mongoose.Schema({
    connection_id: { type: String, default: ()=> uuidv4()},
    user1: { type: String, required: true },
    user2: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'blocked'],
        default: 'pending',
    },
    requestedAt: { type: Date, default: Date.now },
    connectedAt: { type: Date },
}, {
    timestamps: true,
});

const Connection = mongoose.model('connection', ConnectionSchema);

module.exports = Connection;
