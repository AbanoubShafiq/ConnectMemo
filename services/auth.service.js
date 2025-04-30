const {signToken, verifyToken}= require("../uility/jwtTokenManager");

const User = require("../models/user.model")

const {
    getUserCalims,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    getUserById,

} = require("../services/user.service")



// register 
const resgisterUser = async(userObj)=> {
    try {
        const user = await createUser(userObj);
        if (!user.success)
        {
            return {success: false, Message: user.Message}
        }
        const claims = user.Message;
        const token = signToken(claims) ;   

        return {success: true, Message: token}
    }catch (error)
    {
        return {success: false, Message: error.message}
    }
}



// login
// there is three way to login to system 
// email not found 
// password not correct 
// email exist and password correct => return token 

const loginUser = async (email, password)=> {
    try
    {
        const user = await getUserByEmail(email);
        if (!user.success)
        {
            // throw new Error(user.Message);
            return {success: false, Message: user.Message};
        }

        const isMatchPassword = await User.comparePassword(password)
        if (!isMatchPassword)
        {
            // throw new Error("password not match");
            return {success: false, Message: "Invalid Password or user "};
        }

        const claims = await getUserCalims(user.user_id);
        return {success: true, Message: claims};
        // return signToken(claims);

    }catch (error)
    {
        console.log(error.message);
    }
}


module.exports = {
    loginUser,
    resgisterUser
}