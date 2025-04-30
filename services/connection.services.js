const {
    addConnection,
    getAllConnection,
    getConnectionById,
    deleteConnection,
    updateConnection
} = require("./../repos/connection.repo");

const {
    getUserById
} = require("../repos/user.repo");
const { connection } = require("mongoose");


// validation for create connection
const validation = async (userIdOne, userIdTwo ) => {
    if (!userIdOne || !userIdTwo)
    {
        return {valid: false, Message: "Fields Should Be passed"};
    }else 
    {
        const userOne = await getUserById(userIdOne);
        const userTwo = await getUserById(userIdTwo);

        if (!userOne || !userTwo|| !userOne.is_active|| !userTwo.is_active)
        {
            return {valid: false, Message: "One User Or Both Not found"};
        }
        const chk = await chkConnectionExistence(userIdOne, userIdTwo);
        if (chk)
        {
            return {valid: false, Message: "both already on a connection"};
        }
        return {valid: true, Message: "validation passed"};
    }
}

const chkConnectionExistence = async (userIdOne, userIdTwo) => {
    const allconnection = await getAllConnection();
    if (allconnection.length == 0)
        return false;

    for(const connection of allconnection)
    {
        if (connection.user1 == userIdOne && connection.user2 == userIdTwo||
            connection.user1 == userIdTwo && connection.user2 == userIdOne)
        return true;
    }
    return false;
}



// addConnection
module.exports.addConnection = async (userIdOne, userIdTwo) => {
    try {
        
        const chkMsg = await validation(userIdOne, userIdTwo);
        if (!chkMsg.valid)
        {
            return {success: false, Message: chkMsg.Message};
        }
        const createdConnection = await addConnection(userIdOne, userIdTwo);
        return {success: true, Message: createdConnection};

    }catch (error)
    {
        console.log(error.Message);
    }
}

// getAllConnection
module.exports.getAllConnection = async () => {
    const users = await getAllConnection();
    return {success: true, Message: users};
}

// getConnectionById
module.exports.getConnectionById = async (connectionId) => {
    if (!connectionId)
    {
        return {success: false, Message: "Connection Id Should Be Passed"};
    }
    const connection = await getConnectionById(connectionId);

    if (!connection){
        return {success: false, Message: "Connection Not Found"};
    }else 
    {
        return {success: true, Message: connection};
    }
}

// validation connectionExistance
const connectionExistanceValidation = async (connectionId) => {
    if (!connectionId)
    {
        return {valid: false, Message: "Connection Id Should Be Passed"};
    }
    const connection = await getConnectionById(connectionId);
    console.log(connection)
    if (!connection)
    {
        return {valid: false, Message: "Connection Not Found"};
    }else {
        return {valid: true, Message: connection};
    }
}

// deleteConnection
module.exports.deleteConnection = async(connectionId) => {
    const chkConnection = await connectionExistanceValidation(connectionId);

    if (!chkConnection.valid)
    {
        return {success: false, Message: chkConnection.Message};
    }else 
    {
        await deleteConnection(connectionId);
        return {success: true, Message: "Connection Deleted Successfully!"};
    }
}


// update connection 
module.exports.updateConnection = async (connectionId, updatedData)=> {
    try{
        const conneciton = await getConnectionById(connectionId);
        if (!connectionId)
        {
            return {success: false, Message: "Connection id should by passed!"};
        }
        if (!conneciton)
        {
            return {success: false, Message: "No matched Connection!"};
        }
        const updatedConnection = await updateConnection(connectionId, updatedData);

        if (!updatedConnection.modifiedCount)
        {
            return {success: true, Message: "No Data Changes"};
        }
        return {success: true, Message: "Connection Updated Successfully !"};

    }catch (error)
    {
        console.log(error.Message);
    }
}

