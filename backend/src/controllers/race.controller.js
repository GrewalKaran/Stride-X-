const {getAuth} = require('@clerk/express');
const userModel = require('../models/users.model');
const raceModel = require('../models/race.model');

async function startRaceController(req,res){

    const { userId } = getAuth(req);

    const user = await userModel.findOne({
    clerkUserId: userId
    });

    if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
    }

    const existingRace = await raceModel.findOne({
      clerkUserId: userId,
      status: "active"
   });

   if (existingRace) {
      return res.status(400).json({
         message: "Race already active"
      });
   }

   const race = await raceModel.create({
      user: user._id,
      clerkUserId: userId,
      startTime: new Date(),
      status: "active"
   });

    res.status(201).json({
      message: "Race started",
      race
   });
}

async function endRaceController(req,res){
    const { userId } = getAuth(req);

    const user = await userModel.findOne({
    clerkUserId: userId
    });

    if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
    }
    
    const existingRace = await raceModel.findOne({
      clerkUserId: userId,
      status: "active"
   });

   if(!existingRace){
      return res.status(400).json({
      message: "Cannot find active race that you want to finish"
      });
   }

   const {
      distance,
      duration,
      avgPace,
      calories,
      route
   } = req.body;


   const race = await raceModel.findOneAndUpdate(
      {
         clerkUserId: userId,
         status: "active"
      },
      {
         status: "completed",
         endTime: new Date(),
         distance,
         duration,
         avgPace,
         calories,
         route
      },
      {
        new: true
      }
)

    return res.status(200).json({
      message: "Race finished successfully",
      race
   });

}

async function myRacesController(req,res){
    const { userId } = getAuth(req);

    const user = await userModel.findOne({
    clerkUserId: userId
    });

    if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
    }
    
    const races = await raceModel.find({
      clerkUserId: userId,
      status: "completed",
    })
    .sort({ createdAt: -1 });


   return res.status(200).json({
    message:"Fetched all users races sucessfully",
    races,

   })
}

module.exports = {startRaceController,endRaceController,myRacesController}