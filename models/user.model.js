const mongoose = require("mongoose");

const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    user_id: { type: String, default: () => uuidv4()},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed password
    profilePicture: { type: String },
    is_active: {type: Boolean, default: true}
    }, {    
    timestamps: true,
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
