const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    user_id: { type: String, default: () => uuidv4()},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed password
    profilePicture: { type: String },
    is_active: {type: Boolean, default: true},
    user_type: {
        type: String,
        enum: ["super_admin", "verified_user"],
        required: true
    },
    salt: {
        type: String,
        required: true   
    }
    }, {    
    timestamps: true,
});


const User = mongoose.model("users", UserSchema);

UserSchema.methods.comparePassword = async function (enteredPassword)
{
    const chkPassword = await bcrypt.hash(enteredPassword, this.salt);
    return this.password === chkPassword;
}


module.exports = User;
