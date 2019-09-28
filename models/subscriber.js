const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subscriberToChannel: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: String,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Subscriber", subscribeSchema);
