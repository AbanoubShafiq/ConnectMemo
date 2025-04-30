
const {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
}= require("../services/todo.service")

module.exports = (() => {
    const router = require("express").Router();


    router.post("/todo/createTodo", async (req, res) => {
        try {
          const todo = await createTodo(req.body);
          res.status(201).json(todo);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
      
      router.get("/todos", async (req, res) => {
        try {
          const todos = await getTodos();
          res.status(200).json(todos);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
      
      router.get("/todo/getTodoById", async (req, res) => {
        try {
          const todo = await getTodoById(req.params.id);
          if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
          }
          res.status(200).json(todo);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
      
      router.put("/todo/addTodo", async (req, res) => {
        try {
          const updatedTodo = await updateTodo(req.params.id, req.body);
          if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
          }
          res.status(200).json(updatedTodo);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
      
      router.delete("/todo/deleteTodoById", async (req, res) => {
        try {
          const deletedTodo = await deleteTodo(req.params.id);
          if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
          }
          res.status(200).json({ message: "Todo deleted successfully" });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
      

    // complete what remains 
    return router;
})()


