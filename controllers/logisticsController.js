const Logistics = require('../models/Logistics');

exports.createLogistics = async (req, res) => {
    const { rental_id, pickup_location, delivery_location, delivery_option, delivery_date } = req.body;

    try {
        const result = await Logistics.create(rental_id, pickup_location, delivery_location, delivery_option, delivery_date);
        res.status(201).json({ message: 'Logistics created successfully', logisticsId: result.insertId });
    } catch (error) {
        console.error('Error creating logistics:', error);
        res.status(500).json({ error: 'Error creating logistics' });
        next(error); 
    }
};

exports.getAllLogistics = async (req, res) => {
    try {
        const logistics = await Logistics.getAll();
        res.status(200).json(logistics);
    } catch (error) {
        console.error('Error retrieving logistics:', error);
        res.status(500).json({ error: 'Error retrieving logistics' });
        next(error); 
    }
};

exports.getLogisticsById = async (req, res) => {
    const { id } = req.params;

    try {
        const logistics = await Logistics.getById(id);
        if (!logistics) {
            return res.status(404).json({ error: 'Logistics not found' });
        }
        res.status(200).json(logistics);
    } catch (error) {
        console.error('Error retrieving logistics:', error);
        res.status(500).json({ error: 'Error retrieving logistics' });
        next(error); 
    }
};

exports.updateLogistics = async (req, res) => {
    const { id } = req.params;
    const { pickup_location, delivery_location, delivery_option, delivery_date } = req.body;

    try {
        const result = await Logistics.update(id, pickup_location, delivery_location, delivery_option, delivery_date);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Logistics not found' });
        }
        res.status(200).json({ message: 'Logistics updated successfully' });
    } catch (error) {
        console.error('Error updating logistics:', error);
        res.status(500).json({ error: 'Error updating logistics' });
        next(error); 
    }
};

exports.deleteLogistics = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Logistics.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Logistics not found' });
        }
        res.status(200).json({ message: 'Logistics deleted successfully' });
    } catch (error) {
        console.error('Error deleting logistics:', error);
        res.status(500).json({ error: 'Error deleting logistics' });
        next(error); 
    }
};
