const express = require('express');
const multiplayerController = require('../controllers/multiplayer.controller');
const router = express.Router()

router.post(
  "/create-room",
  multiplayerController.createRoom
);

router.post(
  "/join-room",
  multiplayerController.joinRoom
);

router.post(
  "/start-race/:roomCode",
  multiplayerController.startRace
);

router.get(
  "/room/:roomCode",
  multiplayerController.getRoom
);

router.patch(
  "/finish-race/:roomCode",
  multiplayerController.finishMultiplayerRace
);


module.exports = router;