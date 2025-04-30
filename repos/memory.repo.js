
const Memory = require("../models/momory.model");

module.exports.getAllMemo = async () =>{
    try{
        const memos = await Memory.find({});
        return memos;
    }catch(error)
    {
        console.log(error.Message)
    }
}

// const validateMemoExistance = async(memoId)=> {
//     if (!memoId)
//     {
//         return {valid: false, Message: "Memo Id Should Be Passed"};
//     }
//     const memo = await Memory.findOne({memory_id: memoId});
//     if (memo)
//     {
//         return {valid: false, Message: "There is not memo With that id"};
//     }
//     return {valid: true, Message: memo};
// }

    // try{
    //     const memo = await validateMemoExistance(memoId);
    //     if (!memo.valid)
    //     {
    //         return {success: false, Message: memo.Message};
    //     }else {
    //         return {success: true, Message: memo.Message};
    //     }
    // }catch(error)
    // {
    //     console.log(error.Message);
    // }


module.exports.getMemoById = async (memoId) =>{
    try{
        const memo = Memory.findOne({memory_id: memoId});
        return memo;
    }catch(error)
    {
        console.log(error.Message);
    }
}

// check parameter needed
module.exports.addMemo = async (createdMemo) =>{
    try
    {
        const createdMemory = await Memory.insertMany([createdMemo]);
        return createdMemory;
    }catch(error)
    {
        console.log("enterrrrrrrrrrr")
        console.log(error.Message);
    }
}

// check parameter needed
module.exports.updateMemo = async(memoId, updatedData) => {
    try
    {
        console.log(updatedData)
        await Memory.updateOne({memory_id: memoId}, {
            $set: {...updatedData}
        })
        console.log(await this.getMemoById(memoId))

    }catch(error)
    {
        console.log(error.Message);
    }
}

module.exports.deleteMemo = async(memoId) => {
    try
    {
        const chk = await Memory.deleteOne({memory_id: memoId})
        return chk;

    }catch(error)
    {
        console.log(error.Message);
    }
}

