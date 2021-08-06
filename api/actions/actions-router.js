// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const Actions = require('./actions-model');

// endpoints
//* GET action(s) - return array of actions
router.get('/', (req, res) => {
    Actions.get()
        .then(items => {
            res.json(items)
        })
        .catch(err => {
            res.status(500).json({
                message: "The action information could not be retrieved."
            })
        })
})

//* GET action - return action as response body


//* POST new action - return new action


//* PUT update action


//* DELETE action
  
// do not forget to export the router
module.exports = router;