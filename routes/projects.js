var express = require('express');
var router = express.Router();
const Project = require('../models/project');

// API endpoints generated for the Projects controller. The functions within this controller
// allows you to perform CRUD operations over the Project model

// Get all the projects' data for a given user.
router.get("/", async (req, res) => {
  projects = await Project.find({userId: req.query.userId }).exec();
  res.json(projects)
})

// Get a specific project data given its unique identifier.
router.get("/:id", async(req, res) => {
  project = await Project.findOne({_id: req.params.id}).exec()
  res.json(project)
}) 

// Store a new project in the database. The project must be linked to a specific user.
router.post("/", async (req, res) => {
  try {
    const { project } = req.body;
    const newProject = await new Project({name: project.name, description: project.description,
                                      start_at: project.start_at, userId: project.userId}).save()
    res.json(newProject);
  }
  catch(error) {
    console.log(error);
    res.status(422).send("Project creation failed");
  }
}) 

// Update an existing project in the database. 
router.put("/:id", async (req, res) => {
  try {
    const { project } = req.body;
    const updatedProject = await Project.findOneAndUpdate({_id: req.params.id}, 
      { $set: {
        name: project.name,
        description: project.description,
        start_at: project.start_at
        } 
      },{new: true});
    if (updatedProject) {
        res.status(202).json(project);
    } else {
        return res.sendStatus(404); 
    }
  } 
  catch(error) {
    console.log(error);
    res.status(422).send("Project update failed");
  }
})

// Delete an existing project and all its associated tickets from the database.
router.delete("/:id", async(req, res) => {
  try {
    const deletedProject = await Project.findOneAndDeleteAll({
      _id: req.params.id,
    });
    res.json(deletedProject);
  } 
  catch (error) {
    res.status(400).send(error);
  }
})

module.exports = router