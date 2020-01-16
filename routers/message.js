const express = require('express');
const hubs = require('../hubs/hubs-model');

const router = express.Router({
  mergeParams: true,
});

router.get("/", (req, res) => {
  // hubs.findHubMessages(hubId);
  // console.log(req.params);
  // res.end();

  hubs.findHubMessages(req.params.id)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ 
        message: "Could not get hub messages" 
      })
    })
});

// Need to fix endpoint
router.get("/:messageId", (req, res) => {
  hubs.findMessageById(req.params.id, req.params.messageId)
    .then(data => {
      if(data) {
        res.json(data);
      } else {
        res.status(404).json({ 
          message: "Message was not found." 
        })
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ 
        message: "Could not get hub message" 
      })
    })
});

router.post("/", (req, res) => {
  if(!req.body.sender || !req.body.text) {
    return res.status(400).json({ 
      message: "Need sender and text values." 
    });
  }

  const payload = {
    sender: req.body.sender,
    text: req.body.text,
  }

  hubs.addMessage(req.params.id, payload)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ 
        message: "Coulnd not find hub message." 
      });
    })
});

module.exports = router;