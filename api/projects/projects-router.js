// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Projects = require('./projects-model');

// endpoints
//* GET project(s) - return array of projects
router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({
                message: "The information could not be retrieved"
            })
        })
})

//* GET project - return project as response body
router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
           if (!project) {
                res.status(404).json({
                    message: "There is no project with that ID.",
                })
           } res.json(project)
        })
        .catch(err => {
            res.status(500).json({
                message: "The project information could not be retrieved.",
                err: err.message
            })
        })
})

//* GET array of actions
router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            if (!actions) {
                res.status(404).json({
                    message: "There are no actions associated with that project ID."
                })
            } res.json(actions)
        })
        .catch(err => {
            res.status(500).json({
                message: "The action information could not be retrieved.",
                err: err.message
            })
        })
})

//* POST new project - return new project
router.post('/', (req, res) => {
    const newProject = req.body;
    if (!newProject.name || !newProject.description) {
        res.status(400).json({
            message: 'Please provide a name and description of the project.'
        })
    } else {
        Projects.insert(newProject)
            .then(newProject => {
                res.status(201).json(newProject);
            })
            .catch(err => {
                res.status(500).json({
                    message: 'There was an error saving this project to the database.',
                    err: err.message
                })
        })
    }
})

//* PUT update project
router.put('/:id', async (req, res) => {
    const possibleProject = await Projects.get(req.params.id)
    if (!possibleProject) {
        res.status(404).json({
            message: 'There is no project with that ID.'
        })
    } else {
        if (!req.body.name || !req.body.description) {
            res.status(400).json({
                message: 'Please provide a name and description of the project.'
            })
        } else {
            try {
                const updatedProject = await Projects.update(req.params.id, req.body);
                res.status(200).json(updatedProject);
            } catch (err) {
                res.status(500).json({
                    message: 'The project information could not be modified.',
                    err: err.message
                })
            }
        }
    }
})

//* DELETE project
router.delete('/:id', async (req, res) => {
    const possibleProject = await Projects.get(req.params.id)
    if (!possibleProject) {
        res.status(404).json({
            message: "There is no project with that ID."
        })
    } else {
        try {
            const deletedProject = await Projects.remove(possibleProject.id)
            res.status(200).json(`Project ${possibleProject.id} removed.`)
        }
        catch (err) {
            res.status(500).json({
                message: "The project could not be removed.",
                err: err.message
            })
        }
    } 
})
  
  // do not forget to export the router
  module.exports = router;