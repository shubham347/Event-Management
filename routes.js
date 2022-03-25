const express = require('express');
const router = express.Router();
const eventController = require('./controller');

//Upcoming event
router.get("/event", eventController.showEvents);
//Live event- it should only be live 10 mins before the start time of the event.
router.get("/event/live", eventController.liveEvents);
//Add event
router.post("/event", eventController.addEvent);


module.exports = router;