const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");
const getSubscriber = require("../middleware/getUser");

// find & retrieve all subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.send(subscribers);
  } catch {
    res.status(500).json({ message: err.message });
  }
});

// find & retrieve 1 subscriber by id
router.get("/:id", getSubscriber, (req, res) => {
  res.send(res.subscriber);
});

// create new subscriber
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscriberToChannel: req.body.subscriberToChannel
  });
  try {
    const newSub = await subscriber.save();
    res.status(201).json(newSub);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// update subscriber
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    req.body.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedSub = await res.subscriber.save();
    res.json(updatedSub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete subscriber
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted Subscriber!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
