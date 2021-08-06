// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

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
router.post('/', async (req, res) => {
    const action = req.body;
    if (!action.project_id || !action.description || !action.notes) {
        res.status(400).json({
            message: 'Project ID, action description, and notes are required.'
        })
    } else {
        const findProject = await Projects.get(action.project_id)
        if (!findProject) {
            res.status(404).json({
                message: 'There is no project with that ID.'
            })
        } else {
            try {
                const newAction = await Actions.insert(action)
                res.status(201).json(newAction)
            } catch (err) {
                res.status(500).json({
                    message: 'There was an error saving this action to the database.',
                    err: err.message
                })
            }
        }
    }
})

//* PUT update action
router.put('/:id', async (req, res) => {
    const possibleAction = await Actions.get(req.params.id)
    if (!possibleAction) {
        res.status(404).json({
            message: 'There is no action with that ID.'
        })
    } else {
        if (!req.body.project_id || !req.body.notes || !req.body.description) {
            res.status(400).json({
                message: 'Please a project ID, action description and notes.'
            })
        } else {
            try {
                const updatedAction = await Actions.update(req.params.id, req.body);
                res.status(200).json(updatedAction);
            } catch (err) {
                res.status(500).json({
                    message: 'The action information could not be modified.',
                    err: err.message
                })
            }
        }
    }
})

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