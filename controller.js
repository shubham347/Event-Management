require("./config/connection").connect();
const Event = require("./model/event");

function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

const showEvents = async (req, res) => {

    const events = await Event.find({ start_at: { $gte: new Date() } });
    if (events) {
        res.status(200).json(events);
    } else {
        res.status(200).send("No upcoming events")
    }
}

const liveEvents = async (req, res) => {
    const liveTime = AddMinutesToDate(new Date(), 10);
    const events = await Event.find({ start_at: liveTime });

    if (events) {
        res.status(200).json(events);
    } else {
        res.status(200).send("No live events")
    }

}

const addEvent = async (req, res) => {

    try {
        const { eventName, duration, startTime } = req.body;
        const expiryTime = AddMinutesToDate(new Date(), duration);
        
        if (!(eventName && duration && startTime)) {
            res.status(400).send("All inputs required");
        }
        const startDate = new Date(startTime);
        const event = await Event.create({
            event_name: eventName,
            Start_at: startDate,
            duration: duration,
            expire_at: expiryTime
        });

        if (event) {
            res.status(201).json(event);
        } else {
            res.status(209).send("Event not created")
        }
    }
    catch (err) {
        console.log(err);
    }
}

//Event will look like -
// {
//     "_id": "623c588b17b93ee873711093",
//     "event_name": "New Sale Event",
//     "Start_at": "2022-03-23T12:30:00.000Z",
//     "duration": 120,
//     "expire_at": "2022-03-24T14:30:55.036Z",
//     "__v": 0
// }

module.exports = { showEvents, addEvent, liveEvents };