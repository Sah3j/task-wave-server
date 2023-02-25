const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors({
  origin: "*",
}));
app.use(express.json());

const Db = process.env.ATLAS_URI;
const ProjectModal = require('./modals/Projects')
//app.use(require("./routes/record"));
// get driver connection
//const dbo = require("./db/conn");

mongoose.connect(
  Db
);

app.get("/getProjects", (req, res) => {
  ProjectModal.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get('/getTasks/:id', (req, res) => {
  const id = req.params.id
  ProjectModal.findById(id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })
})

app.put('/updateTaskStatus/:projectId/:taskId', async (req, res) => {
  const { projectId, taskId } = req.params;
  const { status } = req.body;

  try {
    const project = await ProjectModal.findById(projectId);
    const task = project.tasks.id(taskId);
    task.status = status;
    await project.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/createProject", async (req, res) => {
  const project = {
    name: req.body.name,
    description: req.body.description,
    members: req.body.assignedMembers,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  const newProject = new ProjectModal(project);
  await newProject.save();

  res.json(project);
})

app.post("/addNewTask", async (req, res) => {
  const projectId = req.body.projectId;
  const task = {
    description: req.body.description,
    assignedTo: req.body.assignedTo,
    dueDate: req.body.dueDate,
    status: req.body.status,
  };

  try {
    const project = await ProjectModal.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.tasks.push(task);
    await project.save();
    res.json(project);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
});