// Write your "projects" router here!
// Write your "actions" router here!
const express = require('express');
const router = express.Router();

// const Action = require('../actions/actions-model');
// const Project = require('./projects/projects-model');

// const {

// } = require('./projects-middleware');

// endpoints

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