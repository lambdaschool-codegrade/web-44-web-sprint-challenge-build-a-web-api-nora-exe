// Write your "projects" router here!
// Write your "actions" router here!
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


//* PUT update project


//* DELETE project




// handle errors
// router.use((err, req, res) => {
//     res.status(err.status || 500).json({
//       customMessage: 'Wow, you found an error! Neat!',
//       message: err.message,
//       stack: err.stack
//     })
//   })
  
  // do not forget to export the router
  module.exports = router;