
const {
    getUsers,
    createUser,
    deleteUser,
    getUserById,
    getUserByEmail,
    updateUser
} = require("./../repos/user.repo")

const bcrypt = require("bcrypt")


module.exports.getUsers = async () => {
    return getUsers();
}


module.exports.getUserCalims = async(userId)=> {
    try{
        const user = await getUserById(userId);
        if (!user)
        {
            return {success: true, Message: "User Not found"};
        }
        const claims = {
            sub: user.user_id,
            first_name: user.first_name,
            email: user.email,
            userType: user.user_type
        }
    
        return {success:true, Message:claims};
    }catch(error)
    {
        console.log(error.Message);   
    }

}

module.exports.createUser = async (data) =>{
    try{
        const chk = await validationOnUserCreation(data, true);
        if (!chk.valid)
        {
            return {success: false, Message: chk.Message};
        }

        const salt = await bcrypt.genSalt(10);
        data.salt = salt;
        data.password = await bcrypt.hash(data.password, data.salt);
        data.user_type = "verified_user"
        const CreatedUser = await createUser(data);
        
        const claims = {
            sub: CreatedUser.user_id,
            userName: data.first_name,
            email: data.email,
            userType: data.user_type
        }

        return {success: true, Message: claims};
        
    }catch(error)
    {
        console.log(error)
    }
};




module.exports.updateUser = async (userId, updatedData)=>{
    try
    {
        if (!userId)
        {
            return {success: false, Message: "userid should Be passed"}
        }
        const userChk = await getUserById(userId);
        if (!userChk)
        {
            return {success: false, Message: "no user with that id"}
        }

        const chk = await validationOnUserCreation(updatedData, false)
        if (!chk.valid)
        {
            return {success: false, Message: chk.Message}
        }

        await updateUser(userId, updatedData);
        return {success: true,Message: "User Data updated Successfully!"};

    }catch(error)
    {
        console.log(error.Message);
    }
}



// deleteUser
module.exports.deleteUser = async (userId) => {
    try{
        const user = await deleteUser(userId);
        return user;
    }catch (error)
    {
        console.log(error.Message);
    }
}

// getUserById
module.exports.getUserById = async (userId ) => {
    try{
        const user = await getUserById(userId);
        return user;
    }catch(error)
    {
        console.log(error.Message);
    }
}

// getUserbyEmail
module.exports.getUserByEmail = async (userEmail ) => {
    try{
        const user = await getUserByEmail(userEmail);
        if (!user)
        {
            return {success:false, Message: "No Users With that Email"};
        }
        return {success:true, Message: user};;
    }catch(error)
    {
        console.log(error.Message);
    }
}



// validation on creation 
const validationOnUserCreation = async (data, addFlag)=>
{
    const {first_name, last_name, email, password} = data;
    if (addFlag)
    {
        if (!first_name || !last_name || !email || !password)
        {
            return {valid: false, Message: "Data Showed be Passed"};
        }
    }
    
    if (email || addFlag)
    {
        // validate email 
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!emailRegex.test(email)) {
            return {valid: false, Message: "Email Should Be Valid"};
        }

        const chkUser = await getUserByEmail(email);
        if (chkUser)
        {
            return {valid: false, Message: "Email Already Exists "};
        }

    }

    if (password || addFlag)
    {
        // validate Password To Be Complex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(password))
        {
            return {valid: false, Message: "Password Should Be complex"};
        }
    }

    return {valid: true, Message: "valid"};
}



