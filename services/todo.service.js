const TodoModel = require('../models/todo.modles');


module.exports.createTodo = async (todo) => {
    try {
        return await TodoModel.create(todo);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports.getTodos = async () => {
    try {
        return await TodoModel.find({});
    } catch (error) {
        throw new Error(error);
    }
}
module.exports.getTodoById = async (id) => {
    try {
        return await TodoModel.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports.updateTodo = async (id, todo) => {
    try {
        return await TodoModel.findByIdAndUpdate(id, todo, { new: true });
    } catch (error) {
        throw new Error(error);
    }
}

// super admin only who can do this
module.exports.deleteTodo = async (id) => {
    try {
        return await TodoModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

