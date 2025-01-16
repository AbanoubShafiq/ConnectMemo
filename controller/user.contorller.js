// const { createUser } = require("../repos/user.repo");
// const { getUserById } = require("../repos/user.repo");
const {getUsers, createUser, deleteUser, getUserById, getUserByEmail } = require("../services/user.service");

const express = require("express");

module.exports = (() => {
    const router = require("express").Router();
    router.get("/users", async (req, res, next) => {
        const users = await getUsers();
        res.status(200).json(users);
    })

    // Middleware to parse JSON bodies 
    router.use(express.json()); 
    // Middleware to parse URL-encoded bodies 
    router.use(express.urlencoded({ extended: true }));

    router.post("/users/add", async (req, res,next) => {

        // get argument values
        const {fname, lname, email, password} = req.body;

        if (!fname || !lname || !email || !password)
        {
            res.status(400).send("All Parameter Required!")
            return;
        }
        // validate email 
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            res.status(400).send("Email Must Be Complex!")
            return;
        }
        // validate Password To Be Complex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(password))
        {
            res.status(400).send("Password Must Be Complex!")
            return ;
        }

        const chkUser = await getUserByEmail(email);
        if (chkUser)
        {
            res.status(400).send("Email Already Exist");
            return;
        }

        const user = await createUser(fname, lname, email, password);
        res.status(200).json(user);
    })

    router.get("/users/delete", async(req, res, next) => {
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

    return router;
})()


