var express = require('express');
var router = express.Router({mergeParams: true});
const Ticket = require('../models/ticket');

// API endpoints generated for the Tickets controller. The functions within this controller
// allows you to perform CRUD operations over the Ticket model

// Get all the tickets' data for a given project.
router.get("/", async (req, res) => {
  tickets = await Ticket.find({projectId: req.params.project_id }).exec();
  res.json(tickets)
})

// Store a new ticket in the database. The ticket must be linked to a specific project.
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

// Update an existing ticket in the database. 
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

// Delete an existing ticket from the database.
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