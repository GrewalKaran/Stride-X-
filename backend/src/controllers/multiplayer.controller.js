const { getAuth } = require("@clerk/express");

const userModel = require("../models/users.model");
const raceModel = require("../models/race.model");
const multiplayerRoomModel = require("../models/multiplayerRoom.model");

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function createRoom(req, res) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await userModel.findOne({ clerkUserId: userId });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { raceType, targetDistance, targetTime } = req.body;

  if (!raceType || !["distance", "time"].includes(raceType)) {
    return res.status(400).json({ message: "Invalid race type" });
  }

  const roomCode = generateRoomCode();

  const room = await multiplayerRoomModel.create({
    roomCode,
    host: user._id,
    hostClerkUserId: userId,
    raceType,
    targetDistance: raceType === "distance" ? targetDistance : null,
    targetTime: raceType === "time" ? targetTime : null,
    players: [
      {
        user: user._id,
        clerkUserId: userId,
        username: user.username,
      },
    ],
  });

  return res.status(201).json({
    message: "Room created successfully",
    room,
  });
}

async function joinRoom(req, res) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await userModel.findOne({ clerkUserId: userId });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { roomCode } = req.body;

  const room = await multiplayerRoomModel.findOne({ roomCode });

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  if (room.status !== "waiting") {
    return res.status(400).json({ message: "Room is not joinable" });
  }

  const alreadyJoined = room.players.some(
    (player) => player.clerkUserId === userId
  );

  if (alreadyJoined) {
    return res.status(200).json({
      message: "Already joined room",
      room,
    });
  }

  if (room.players.length >= room.maxPlayers) {
    return res.status(400).json({ message: "Room is full" });
  }

  room.players.push({
    user: user._id,
    clerkUserId: userId,
    username: user.username,
  });

  await room.save();

  return res.status(200).json({
    message: "Joined room successfully",
    room,
  });
}

async function startRace(req, res) {
  const { userId } = getAuth(req);
  const { roomCode } = req.params;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const room = await multiplayerRoomModel.findOne({ roomCode });

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  if (room.hostClerkUserId !== userId) {
    return res.status(403).json({ message: "Only host can start race" });
  }

  if (room.players.length < 2) {
    return res.status(400).json({ message: "Need 2 players to start" });
  }

  if (room.status !== "waiting") {
    return res.status(400).json({ message: "Race already started" });
  }

  for (const player of room.players) {
    const race = await raceModel.create({
      user: player.user,
      clerkUserId: player.clerkUserId,
      mode: "multiplayer",
      status: "active",
      startTime: new Date(),
    });

    player.race = race._id;
  }

  room.status = "active";
  room.startedAt = new Date();

  await room.save();

  return res.status(200).json({
    message: "Multiplayer race started",
    room,
  });
}

async function getRoom(req, res) {
  const { userId } = getAuth(req);
  const { roomCode } = req.params;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const room = await multiplayerRoomModel
    .findOne({ roomCode })
    .populate("players.user", "username email")
    .populate("players.race");

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  const isPlayer = room.players.some(
    (player) => player.clerkUserId === userId
  );

  if (!isPlayer) {
    return res.status(403).json({ message: "You are not in this room" });
  }

  return res.status(200).json({
    message: "Room fetched successfully",
    room,
  });
}


async function finishMultiplayerRace(req, res) {
  const { userId } = getAuth(req);
  const { roomCode } = req.params;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const room = await multiplayerRoomModel
    .findOne({ roomCode })
    .populate("players.race");

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  const player = room.players.find((p) => p.clerkUserId === userId);

  if (!player) {
    return res.status(403).json({ message: "You are not in this room" });
  }

  const { distance, duration, route } = req.body;

  const race = await raceModel.findOneAndUpdate(
    {
      _id: player.race,
      clerkUserId: userId,
      status: "active",
    },
    {
      status: "completed",
      endTime: new Date(),
      distance,
      duration,
      route,
    },
    { new: true }
  );

  if (!race) {
    return res.status(400).json({ message: "Active race not found" });
  }

  const updatedRoom = await multiplayerRoomModel
    .findOne({ roomCode })
    .populate("players.race");

  const allFinished = updatedRoom.players.every(
    (p) => p.race && p.race.status === "completed"
  );

  if (!allFinished) {
    return res.status(200).json({
      message: "Race saved. Waiting for opponent.",
      race,
      waitingForOpponent: true,
    });
  }

  const [p1, p2] = updatedRoom.players;

  let winnerPlayer = null;

  if (updatedRoom.raceType === "distance") {
    winnerPlayer =
      p1.race.duration < p2.race.duration ? p1 : p2;
  }

  if (updatedRoom.raceType === "time") {
    winnerPlayer =
      p1.race.distance > p2.race.distance ? p1 : p2;
  }

  for (const p of updatedRoom.players) {
    await raceModel.findByIdAndUpdate(p.race._id, {
      result:
        p.clerkUserId === winnerPlayer.clerkUserId ? "win" : "lose",
      opponentDistance:
        p.clerkUserId === p1.clerkUserId
          ? p2.race.distance
          : p1.race.distance,
      opponentDuration:
        p.clerkUserId === p1.clerkUserId
          ? p2.race.duration
          : p1.race.duration,
    });
  }

  

  updatedRoom.status = "completed";
  updatedRoom.winnerRace = winnerPlayer.race._id;
  updatedRoom.endedAt = new Date();

  await updatedRoom.save();

  req.io.to(roomCode).emit("race-completed", {
  roomCode,
});

  const finalRace = await raceModel.findById(race._id);

  return res.status(200).json({
    message: "Multiplayer race completed",
    race: finalRace,
    waitingForOpponent: false,
    winnerClerkUserId: winnerPlayer.clerkUserId,
  });
}

module.exports = {
  createRoom,
  joinRoom,
  startRace,
  getRoom,
  finishMultiplayerRace
};