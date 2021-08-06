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
router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
           if (!action) {
                res.status(404).json({
                    message: "There is no action with that ID.",
                })
           } res.json(action)
        })
        .catch(err => {
            res.status(500).json({
                message: "The action information could not be retrieved.",
                err: err.message
            })
        })
})

//* POST new action - return new action


//* PUT update action


//* DELETE action
router.delete('/:id', async (req, res) => {
    const possibleAction = await Actions.get(req.params.id)
    if (!possibleAction) {
        res.status(404).json({
            message: "There is no action with that ID."
        })
    } else {
        try {
            await Actions.remove(possibleAction.id)
            // console.log(deletedAction);
            res.status(200).json(`Action ${possibleAction.id} removed.`)
        }
        catch (err) {
            res.status(500).json({
                message: "The action could not be removed.",
                err: err.message
            })
        }
    } 
})
  
// do not forget to export the router
module.exports = router;