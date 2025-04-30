// const { Mongoose } = require("mongoose");
const { connection } = require("mongoose");
const Connection = require("../models/connection.model");

module.exports.getConnectionById = (connectionId) => {
    const connection = Connection.findOne({connection_id: connectionId});
    return connection;
}

module.exports.getAllConnection = async () => {
    try{
        const users = await Connection.find({});
        return users;
    }catch(error)
    {
        console.log(error.Message);
    }
}

module.exports.addConnection = async (userIdOne, userIdTwo) => {
    try{
        const createdConnection = await Connection.insertMany([
        {
            user1: userIdOne,
            user2: userIdTwo
        }])

        return createdConnection;
    }catch (error)
    {
        console.log(error.Message)
    }
}

module.exports.updateConnection = async(connectionId, updatedData) => {
    try{
        return await Connection.updateOne({connection_id: connectionId},
            {$set: updatedData}
        )
    }catch(error)
    {
        console.log(error.Message);
    }
}

module.exports.deleteConnection = async (connectionId) => {
    try{
        const deletedData = await Connection.deleteOne({connection_id: connectionId});
    }catch (error)
    {
        console.log(error.Message);
    }
}






