
require("dotenv").config();

const {App_Config} = require("./configs/app.config");
const {MONGO_PROD_URI, App_Name} = App_Config
const express = require("express");
const morgan = require("morgan");
const path = require("path");


// console.log(app_config);


const {Data_Base} = require("./database/mongo/index");
const fileUpload = require("express-fileupload");




(async function () {
    await Data_Base.connectToMongo({
        url: App_Config.MONGO_PROD_URI,
        databaseNam: App_Config.App_Name,
        callback: () => {
            console.log("successful connect")
            const app = express();
            // register global middleware 
            app.use(morgan("common"));
            app.use(fileUpload({
                limits: { fileSize: 50 * 1024 * 1024 },
                useTempFiles : true,
                tempFileDir : path.join(__dirname, '/tmp/'),
                preserveExtension: true
            }))
            app.post("/upload", (req, res, next) => {
                //res.send(req.files.iti.name);
                if (!req.files || Object.keys(req.files).length === 0) {
                    return res.status(400).send("No files were uploaded.");
                }

                const uploadedFile = req.files.iti;
                const uploadPath = path.join(__dirname, "/tmp/", uploadedFile.name);
                uploadedFile.mv(uploadPath, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    }
                    res.send("File uploaded successfully!");
                });

            })

            // register route 
            app.get("/",
            // [(req, res, next) => {
            //     const clientIP = req.ip || req.connection.remoteAddress ;
            //     const clientPort = req.connection.remotePort;
            //     console.log(`Client IP ${clientIP}, Client Port ${clientPort}`);
            //     next();
            // }] 
             (req, res, next) =>{
                // it is handler 
                res.send("Hello ititans ??");

            })

            app.listen(App_Config.HTTP_PORT, "0.0.0.0", () => {
                console.log(`app is running on port ${App_Config.HTTP_PORT}`) 
            })

        }
    })
})()










// const http = require("http");

// const fs = require("fs")

// const hostname = "127.0.0.1";

// const port = 3000;


// const html = require("./helper/html");



// const server = http.createServer((req, res) => {

//     // console.log(req.myprop);


//     // console.log(req.url);
//     // console.log(req.method);

//     switch (req.url) {
//         case "/":
//             res.setHeader("Content_Type", "text/html");
//             res.end();

//             break;
//         case "/Capture":
//             res.setHeader("Content_Type", "image/PNG")
//             const memoryBuffer = fs.readFileSync("./Capture.PNG")
//             res.end(memoryBuffer);
//             break;

//         case "/styles.css":
//             res.setHeader("Content_Type", "text/css");
//             res.end(`
//                 body: {
//                     background-color: red;
//                 }
                
//                 `)
//                 break;

//         case "/profile":
//             res.setHeader("Content_Type", "application/json");
//             res.end(JSON.stringify(({ username: "ali" })));
//             break;
//         default:
//             res.statusCode = 404;
//             res.end("Request Not Detected properly");
//     }



//     res.statusCode = 200;
//     // res.setHeader("Content_Type", "text/html");
//     // res.end("<h1>Abanoub Magdy Fawzy</h1>")
// })

// server.listen(port, hostname, () => {
//     console.log(`server running at http://${hostname}${port}/`);
// })





