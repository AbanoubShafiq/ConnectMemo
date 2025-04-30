const Todo = require("./../models/todo.modles");

const getAllTodos = async () => {
    try {
        const todos = await Todo.find();
        return todos;
    } catch (error) {
        console.error("Error fetching todos:", error);
        return { error: "An error occurred while fetching todos." };
    }
};

const getTodoById = async (id) => {
    try {
        const todo = await Todo.findById(id);
        return todo;
    } catch (error) {
        throw error;
    }
};

const createTodo = async (todoData) => {
    try {
        const newTodo = new Todo(todoData);
        await newTodo.save();
        return newTodo;
    } catch (error) {
        throw error;
    }
};

const updateTodo = async (id, todoData) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, todoData, { new: true });
        return updatedTodo;
    } catch (error) {
        throw error;
    }
};

const deleteTodo = async (id) => {
    try {
        await Todo.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};
