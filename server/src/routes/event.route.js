const express = require("express");
const EventModel = require("../model/event.model");

const app = express.Router();

app.get("/", async (req,res)=> {
    const events = await EventModel.find().sort({createdAt: -1});
    return res.send(events)
})

app.post("/", async(req,res)=> {
    let {desc, date, venue, playersLimit, type, org_id, org_name} = req.body;
    let players = [];

    try{
        let event = new EventModel({desc, date, venue, playersLimit, type, org_id, org_name, players});
        await event.save();
        res.json(event);
    }catch(e){
        return res.status(500).send(e.message);
    }

})

// PUT route to update an event by adding a player
app.put('/:id', async (req, res) => {
    const eventId = req.params.id;
    const player = req.body.player;
  
    try {
      const event = await EventModel.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      event.players.push(player);

      await event.save();
      return res.status(201).send(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
});

app.get('/search', async (req, res) => {
  const keyword = req.query.keyword;

  try {
    const results = await EventModel.find({
      $or: [
        { desc: { $regex: keyword, $options: 'i' } },
        { venue: { $regex: keyword, $options: 'i' } },
        { type: { $regex: keyword, $options: 'i' } },
        { org_name: { $regex: keyword, $options: 'i' } }
      ]
    }).exec();

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;