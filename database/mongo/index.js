const { mongoose } = require("mongoose");
const connectToMongo = async ({ url, databaseNam, callback }) => {
    try {
        await mongoose.connect(url, {
            dbName: databaseNam
        });

        process.nextTick(() => {
            callback()
        })

    } catch (error) {
        console.log(error.message)
        throw new Error("Internal server Error, can not connect to mongo");
    }
}
module.exports.Data_Base = {
    connectToMongo
}


