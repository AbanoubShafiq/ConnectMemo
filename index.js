const {App_Config} = require("./configs/app.config");
const {MONGO_PROD_URI, App_Name} = App_Config
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const app = express();

// register middleware 
app.use(morgan("common"));
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 },useTempFiles : false,preserveExtension: true}))

app.get("/",
 (req, res, next) =>{
    res.send("Hello ititans ??");
})

// controller registeration
const controllersDirctoryPath = path.join(__dirname, "controller")
const controllersDirectory= fs.readdirSync(controllersDirctoryPath);
for (const controllerFile of controllersDirectory)
{
    const controller = require(`./controller/${controllerFile}`);
    app.use(controller);
}   

// export point 
module.exports = app;