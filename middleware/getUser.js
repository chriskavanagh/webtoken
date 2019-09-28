const express = require("express");
const Subscriber = require("../models/subscriber");

// middleware to retrieve subscriber
async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      res.status(404).json({ message: "Can't Find Subscriber" });
    }
  } catch {
    return res.status(500), json({ message: err.message });
  }
  res.subscriber = subscriber;
  next();
}

module.exports = getSubscriber;
