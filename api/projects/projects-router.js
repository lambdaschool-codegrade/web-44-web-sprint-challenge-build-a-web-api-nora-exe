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


// handle errors
router.use((err, req, res) => {
    res.status(err.status || 500).json({
      customMessage: 'Wow, you found an error! Neat!',
      message: err.message,
      stack: err.stack
    })
  })
  
  // do not forget to export the router
  module.exports = router;