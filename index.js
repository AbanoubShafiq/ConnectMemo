const {App_Config} = require("./configs/app.config");
const {MONGO_PROD_URI, App_Name} = App_Config
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const app = express();

const connectionController = require("./controller/connection.controller");
const userController = require("./controller/user.contorller");
const memoryController = require("./controller/memory.controller");
const mediaController = require("./controller/media.controller");
const todoController = require("./controller/todo.controller");
const authenticationController = require("./controller/authentication.controller");

const {authenticaitonMiddleware} = require("./middlewares/authenticaiton.middleware")


app.use(morgan("common"));
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 },useTempFiles : false,preserveExtension: true}))
app.get("/",
 (req, res, next) =>{
    res.send("Hello ititans ??");
})

app.use("/auth", authenticationController);
// app.use(authenticaitonMiddleware);
app.use("/connection",[authenticaitonMiddleware] ,connectionController);
app.use("/user", userController);
app.use("/memory", memoryController);
app.use("/media", mediaController);
app.use("/todo", todoController);



 

// app.use(authenticaitonMiddleware)

// controller registeration
// const controllersDirctoryPath = path.join(__dirname, "controller")
// const controllersDirectory= fs.readdirSync(controllersDirctoryPath);
// for (const controllerFile of controllersDirectory)
// {
//     const controller = require(`./controller/${controllerFile}`);
//     app.use(controller);
// }


// export point 
module.exports = app;