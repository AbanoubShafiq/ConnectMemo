
const {
    getUsers,
    createUser,
    deleteUser,
    getUserById,
    getUserByEmail
} = require("./../repos/user.repo")

module.exports.getUsers = async () => {
    return getUsers();
}

module.exports.createUser = async (
    _first_name,
    _last_name,
    _email,
    _password,) =>{
    try{
        await createUser(_first_name, _last_name,_email, _password);
        return {Message: "User Created Successfully"};
    }catch(error)
    {
        console.log(error)
    }
};

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
        return user;
    }catch(error)
    {
        console.log(error.Message);
    }
}


