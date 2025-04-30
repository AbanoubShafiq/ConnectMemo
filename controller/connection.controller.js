
const express = require("express");
const {
    addConnection,
    getAllConnection,
    getConnectionById,
    deleteConnection,
    updateConnection
} = require("../services/connection.services");
// const { deleteConnection } = require("../repos/connection.repo");

module.exports = (()=> {
    const router = require("express").Router();

    // Middleware to parse JSON bodies 
    router.use(express.json()); 
    // Middleware to parse URL-encoded bodies 
    router.use(express.urlencoded({ extended: true }));

    router.get("/connection", async(req, res, next) => {
        const users = await getAllConnection();
        res.status(200).send(users.Message);

    })

    router.post("/connection/add", async(req, res, next) => {
        const {userIdOne, userIdTwo} = req.body;

        const chkConnection = await addConnection(userIdOne, userIdTwo);
        if(!chkConnection.success)
        {
            res.status(400).send(chkConnection.Message);
        }else 
        {
            res.status(200).send(chkConnection.Message);
        }

    })

    router.get("/connection/getConnectionById", async (req, res, next) => {
        const connection = await getConnectionById(req.body.connectionId)
        if (!connection.success)
        {
            res.status(400).send(connection.Message);
        }else 
        {
            res.status(200).send(connection.Message);
        }
    })

    router.delete("/connection/deleteCollection", async (req, res, next)=> {
        const connection = await deleteConnection(req.body.connectionId)
        
        console.log(connection);

        if (!connection.success)
        {
            res.status(400).send(connection.Message);
        }else 
        {
            res.status(200).send(connection.Message);
        }
    })

    router.patch("/connection/updateConnection", async (req, res, next)=> {
        const chk = await updateConnection(req.body.connectionId, req.body.updatedData);
        if (!chk.success)
        {
            res.status(400).send(chk.Message);
        }else 
        {
            res.status(200).send(chk.Message);
        }
    })

    return router;
})()


