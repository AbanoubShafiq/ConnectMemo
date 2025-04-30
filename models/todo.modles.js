const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is mandatory
    },
    description: {
        type: String,
        required: false, // Optional field
    },
    status: {
        type: String,
        required: true, // Title is mandatory
    },
},{ 
    timestamps: true,
}
)

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;