const {resgisterUser, loginUser} = require("../services/auth.service");
const express = require("express");

module.exports = (()=> {
    const router = require("express").Router();
    // router.use(express.json())
    router.use(express.json()); 
    router.post("/register",async (req, res, next)=> {
        try{
            const chk = await resgisterUser(req.body);
            if (!chk.success)
                return res.status(400).send(chk.Message);
            return res.status(201).send(chk.Message);
        }catch (error)
        {
            return res.status(500).send({message: error.message});
        }     
    })
    router.post("/login", async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const chk = await loginUser(email, password);
            if (!chk.success)
                return res.status(400).send(chk.Message);
            return res.status(200).send(chk.Message);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    });
    return router;
})()


