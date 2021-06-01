var express = require('express');
var router = express.Router({mergeParams: true});
const Ticket = require('../models/ticket');

router.get("/", async (req, res) => {
  tickets = await Ticket.find({projectId: req.params.project_id }).exec();

  res.json(tickets)
})

router.post("/", async (req, res) => {
  try {
    const { ticket } = req.body;
    const newTicket = await new Ticket({name: ticket.name, description: ticket.description,
                                      status: ticket.status, priority: ticket.priority,
                                      end_at: ticket.end_at, projectId: ticket.project_id}).save()
    
    res.json(newTicket);
  }
  catch(error) {
    console.log(error);
    res.status(422).send("Ticket creation failed");
  }
}) 

router.put("/:id", async (req, res) => {
  try {
    const { ticket } = req.body;
    const updatedTicket = await Ticket.findOneAndUpdate({_id: req.params.id}, 
      { $set: {
        name: ticket.name,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        end_at: ticket.end_at
        } 
      },{new: true});
    if (updatedTicket) {
        res.status(202).json(ticket);
    } else {
        return res.sendStatus(404); 
    }
  } 
  catch(error) {
    console.log(error);
    res.status(422).send("Ticket update failed");
  }
})

router.delete("/:id", async(req, res) => {
  try {
    const deletedTicket = await Ticket.findOneAndDelete({
      _id: req.params.id,
    });
    res.json(deletedTicket);
  } 
  catch (error) {
    res.status(400).send(error);
  }
})

module.exports = router