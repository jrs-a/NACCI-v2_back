const Activity = require('../models/activityModel')
const mongoose = require('mongoose')

// get all activities
const getActivities = async (req, res) => {
    const activities = await Activity.find({}).sort({createdAt:-1})
    
    res.status(200).json(activities)
}


// get single activity
const getActivity = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such activity'})
    }

    const activity = await Activity.findById(id)

    if(!activity) {
        return res.status(404).json({error: 'No such activity'})
    }

    res.status(200).json(activity)
}


// create new activity
const createActivity = async (req, res) => {
    const {title, body} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!body) {
        emptyFields.push('body')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    //add doc to db
    try {
        const activity = await Activity.create({title, body})
        res.status(200).json(activity)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete activity
const deleteActivity = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such activity'})
    }

    const activity = await Activity.findOneAndDelete({_id: id})

    if(!activity) {
        return res.status(400).json({error: 'No such activity'})
    }

    res.status(200).json(activity)
}

// update activity
const updateActivity = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such activity'})
    }

    const activity = await Activity.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!activity) {
        return res.status(400).json({error: 'No such activity'})
    }

    res.status(200).json(activity)
}

module.exports = {
    getActivities,
    getActivity,
    createActivity,
    deleteActivity,
    updateActivity
}