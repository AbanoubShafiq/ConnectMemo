
const User = require("./../models/user.model");

// getAllUsers
module.exports.getUsers = async () => {
    try{
        const Users = await User.find({});
        return Users
    }catch (error)
    {
        console.log({
            Message: erro.Message,
            error
        })
    }
}
module.exports.updateUser = async () => {
    
}

// delete user
module.exports.deleteUser = async (userId) =>{
    try{
        var chk = await User.updateOne(
            {user_id: userId}, 
            {$set: {is_active: false}
        })
        console.log(chk);
        console.log("User Deleted Successfully!");
        return deletedUser;
    }catch (error)
    {
        console.log(error.Message);
    }
}



// createUser
module.exports.createUser = async (
    _first_name,
    _last_name,
    _email,
    _password,
) =>{
    try{
        await User.insertMany ([{
            first_name: _first_name,
            last_name: _last_name,
            email: _email,
            password: _password
        }])
    }catch(error)
    {
        console.log({
            Message: error.Message,
            error
        })
    }

}

// getUserbyId
module.exports.getUserById = async(userId) => {
    try{
        const user = User.findOne({user_id: userId});
        return user;
    }catch(error)
    {
        console.log(error.Message);
    }
}

// getUserbyEmail
module.exports.getUserByEmail = async(userEmail) => {
    try{
        const user = User.findOne({email: userEmail});
        return user;
    }catch(error)
    {
        console.log(error.Message);
    }
}