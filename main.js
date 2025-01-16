require("dotenv").config();
const connectMemo = require("./index")
const {App_Config} = require("./configs/app.config");
const {Data_Base} = require("./database/mongo/index");


(async function () {
    await Data_Base.connectToMongo({
        url: App_Config.MONGO_PROD_URI,
        databaseNam: App_Config.App_Name,
        callback: () => {
            connectMemo.listen(App_Config.HTTP_PORT, "0.0.0.0", () => {
                console.log(`app is running on port ${App_Config.HTTP_PORT}`) 
            })
        }
    })
})()

