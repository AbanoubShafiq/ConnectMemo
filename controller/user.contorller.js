// const { createUser } = require("../repos/user.repo");
// const { getUserById } = require("../repos/user.repo");
// const { updateUser } = require("../repos/user.repo");
const {getUsers, createUser, deleteUser, getUserById, getUserByEmail, updateUser } = require("../services/user.service");

const express = require("express");

module.exports = (() => {
    const router = require("express").Router();

    
    router.get("/users", async (req, res, next) => {
        console.log("entered")
        const users = await getUsers();
        res.status(200).json(users);
    })

    // Middleware to parse JSON bodies 
    router.use(express.json()); 
    // Middleware to parse URL-encoded bodies 
    router.use(express.urlencoded({ extended: true }));
    

    router.post("/users/add", async (req, res,next) => {
        try
        {
            const chk  = await createUser(req.body);
            if (!chk.success)
            {
                res.status(400).send(chk.Message);
            }
            res.status(200).send(chk.Message)
        }catch(error)
        {
            console.log(error.message);
        }
    })

    router.delete("/users/delete", async(req, res, next) => {
        const id = req.body.id;

        if (!id)
        {
            res.status(400).send("id should by bassed");
            return;
        }
        const chkUser = await getUserById(id);

        if (!chkUser)
        {
            res.status(400).send("user not found");
            return;
        }

        const user = await deleteUser(id);
        res.status(200).json(user);
    })

    // register getUserById
    router.get("/users/getUserById", async(req, res, next) => {
        const id = req.body.id;
        // check para existance
        if (!id)
        {
            res.status(404).send("Id is Required")
        }
        const user = await getUserById(id);
        // check user existance
        if (!user)
        {
            res.status(400).send("User not found !");
            return;
        }
        res.status(200).send(user);
    })


    // register getUserbyEmail
    router.get("/users/getUserByEmail", async(req, res, next) => {
        const userEmail = req.body.email;
        // check para existance
        if (!userEmail)
        {
            res.status(404).send("Email is Required")
        }
        const user = await getUserByEmail(userEmail);
        // check user existance
        if (!user)
        {
            res.status(400).send("User not found !");
            return;
        }
        res.status(200).send(user);
    })

    router.patch("/users/updateUser", async (req, res, next)=> {

        try
        {
            const chk = await updateUser(req.body.userId, req.body.updatedData);
            if (!chk.success)
            {
                res.status(400).send(chk.Message);
            }
            res.status(200).send(chk.Message);

        }catch(error)
        {
            console.log(error.Message);
        }
    })

    return router;
})()


