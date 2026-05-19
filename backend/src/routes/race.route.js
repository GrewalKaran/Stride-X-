const express = require('express')
const router = express.Router()
const raceController = require('../controllers/race.controller')

router.post('/race/start',raceController.startRaceController)

router.patch('/race/finish',raceController.endRaceController)

router.get('/my-races',raceController.myRacesController)

router.get('/race-report/:raceId',raceController.getRaceReport)

module.exports = router;