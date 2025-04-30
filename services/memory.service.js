// const Memory = require("../models/momory.model");
const {
    addMemo,
    deleteMemo,
    updateMemo,
    getAllMemo,
    getMemoById,

} = require("./../repos/memory.repo")

const {
    getUserById,
    createUser
}= require("./user.service")


module.exports.getAllMemos = async () => {
    const memos = await getAllMemo();
    return {success: true, Message: memos};
}


module.exports.getMemoById = async(memoId) => {
    try{
        if (!memoId){
            return {success: false, Message:"Memo Id Should Be Passed"};
        }else {
            const memo = await getMemoById(memoId);
            if (!memo)
            {
                return {success: false, Message:"No Memo with that id"};
            }
            return {success: true, Message: memo};
        }
    }catch (error)
    {
        console.log(error.Message);
    }
}


const validedMemoData = async(createdMemo, addFlag)=>{
    if (addFlag)
    {
        if (!createdMemo.title || !createdMemo.createdBy)
        {
            return {valid:false, Message: "Some Fields required!"};
        }
    }

    if (addFlag || createdMemo.createdBy)
    {
        const createdUser = await getUserById(createdMemo.createdBy);
        if (!createdUser)
        {
            return {valid:false, Message: "This user Not found!"};
        }
    }
    const viewiedBy = createdMemo.viewied_by
    if (viewiedBy && viewiedBy.length)
    {
        let usertest;
        for(const user of viewiedBy)
        {
            usertest = await getUserById(user);
            if(!user)
            {
                return {valid:false, Message: "One or More user On Viewed By not exists!"};
            }
        }
    }
    return {valid:true, Message: createdMemo};
}



module.exports.addMemo = async(createdMemo) => {
    try
    {
        const chkMemo = await validedMemoData(createdMemo, true);
        console.log(chkMemo)
        if (!chkMemo.valid)
        {
            return {success: false, Message: chkMemo.Message};
        }

        await addMemo(createdMemo)
        return {success: chkMemo.valid, Message: createdMemo};

    }catch (error)
    {
        return {success: false , Message: error.Message};
    }
}


module.exports.deleteMemo = async(memoId)=>
{
    try
    {
        if (!memoId)
        {
            return {success: false, Message: "Memo Id should be passed!"}
        }
        const deletedData = await deleteMemo(memoId);
        if (!deletedData.deletedCount)
        {
            return {success: false, Message: "No Memo with that id!"}
        }
        return {success: true, Message: "Memo Deleted Successfully !"}

    }catch(error)
    {
        console.log(error.Message);
    }
}

module.exports.updateMemo = async(memoId, updateData )=> {
    try{
        if (!memoId)
        {
            return {success: false, Message: "Momory Id should be passed!"};
        }else 
        {
            const memo = await getMemoById(memoId);
            if (!memo)
                return {success: false, Message: "No Matched Memos!"};
        }
        
        const chk = await validedMemoData(updateData, false);
        if (!chk.valid)
        {
            return {success: false, Message: chk.Message};
        }

        await updateMemo(memoId, updateData);
        return {success: true, Message: "Data Updated Successfully !"};
    }catch(error)
    {
        console.log(error.Message);
    }
}