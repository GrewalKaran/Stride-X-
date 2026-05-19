const {getAuth} = require('@clerk/express')
const userModel = require('../models/users.model');

async function syncController(req,res){
    try{
    const {userId} = getAuth(req)

    if(!userId){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    let user = await userModel.findOne({ clerkUserId: userId });

    const {username,email} = req.body

    if (!user) {
      user = await userModel.create({
        clerkUserId: userId,
        username,
        email 
      });
    }

    return res.status(200).json({
      message: "User synced successfully",
      user,
    });
}catch(err){
    console.error("Sync user error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
}

}

module.exports = {syncController}