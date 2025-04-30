const express = require("express");

const {
    getAllMemos,
    getMemoById,
    addMemo,
    deleteMemo,
    updateMemo  
} = require("../services/memory.service");
// const { deleteMemo } = require("../repos/memory.repo");
// const { getAllMemo } = require("../repos/memory.repo");


module.exports = (() => {
    const router = require("express").Router();
    // Middleware to parse JSON bodies 
    router.use(express.json()); 
    // Middleware to parse URL-encoded bodies 
    router.use(express.urlencoded({ extended: true }));

    router.get("/memory", async (req,res,next) => {
        const memos = await getAllMemos();
        res.status(200).send(memos.Message);
    })

    router.get("/memory/getMemoById", async(req,res,next)=> {
        const memo = await getMemoById(req.body.memoId);
        if (!memo.success) 
        {
            res.status(400).send(memo.Message);
        }else 
        {
            res.status(200).send(memo.Message);
        }
    })
    
    router.post("/memory/add", async(req,res,next)=> {
        const createdMemo = await addMemo(req.body);
        if (!createdMemo.success)
        {
            return res.status(400).send(createdMemo.Message);
        }else 
        {
            return res.status(200).send(createdMemo.Message);
        }
    })


    router.delete("/memory/delete", async (req,res,next)=> {
        const deleteCHK = await deleteMemo(req.body.memoId);
        console.log(deleteCHK)
        try
        {
            if (!deleteCHK.success)
            {
                res.status(400).send(deleteCHK.Message);
            }
            res.status(200).send(deleteCHK.Message);
        }catch (error)
        {
            console.log("test")
            console.log(error.Message);
        }
    })

    router.patch("/memory/update", async(req, res, next) => {
        try
        {
            const chk = await updateMemo(req.body.memoId, req.body.updateData);
            if (!chk.success)
            {
                res.status(400).send(chk.Message);
            }
            res.status(200).send(chk.Message);
        }catch (error )
        {
            console.log(error.Message);
        }
    })

    return router;
})()