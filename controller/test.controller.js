const {request, response} = require("express");


module.exports = (() =>{
    const router = require("express").Router();
    router.get("/test", async(req, res, next) => {
        res.send("hello world");
    })
    return router;
})()





