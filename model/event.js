const mongoose = require('mongoose');

const eventSchena = mongoose.Schema({
  event_name: { type: String },
  Start_at: { type: Date, default: Date.now },
  duration: { type: Number },
  expire_at: { type: Date }
});

const Event = new mongoose.model('Event', eventSchena);

module.exports = Event;