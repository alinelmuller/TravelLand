const Plant = require('../models/plant')

const getAllPlants = async (req, res) => {
    try {
        const plants = await Plant.find()
        res.json(plants)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getPlantById = async (req, res) => {
    try {
        const { id } = req.params
        const plant = await Plant.findById(id)
        if (plant) {
            return res.json(plant)
        }
        return res.status(404).send(`that plant doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That plant doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}


//Create Plant
const createPlant = async (req, res) => {
    try {
        const plant = await new Plant(req.body)
        await plant.save()
        return res.status(201).json({
            plant,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Update Plant
const updatePlant = async (req, res) => {
    try {
        let { id } = req.params;
        let plant = await Plant.findByIdAndUpdate(id, req.body, { new: true })
        if (plant) {
            return res.status(200).json(plant)
        }
        throw new Error("Plant not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//Delete Plant
const deletePlant = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Plant.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Plant deleted");
        }
        throw new Error("Plant not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}



module.exports = {
    getAllPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant
}