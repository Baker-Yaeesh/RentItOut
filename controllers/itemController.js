 

const Item = require('../models/Item');

 
exports.createItem = async (req, res) => {
    const { name, description, category, daily_price, monthly_price, yearly_price, security_deposit, damage_protection } = req.body;
    
    if (!name || !description || !category || daily_price === undefined || monthly_price === undefined || yearly_price === undefined || security_deposit === undefined || damage_protection === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        await Item.create({ ...req.body, userId: req.user.userId });
        return res.status(201).json({ message: 'Item created successfully' });
    } catch (error) {
        console.error('Create item error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

 
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        return res.status(200).json(items);
    } catch (error) {
        console.error('Get all items error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

 
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.status(200).json(item);
    } catch (error) {
        console.error('Get item by ID error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

 
exports.updateItem = async (req, res) => {
    const { name, description, category, daily_price, monthly_price, yearly_price, security_deposit, damage_protection } = req.body;
    
    if (!name || !description || !category || daily_price === undefined || monthly_price === undefined || yearly_price === undefined || security_deposit === undefined || damage_protection === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await Item.update(req.params.id, req.body);
        return res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
        console.error('Update item error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

 
exports.deleteItem = async (req, res) => {
    try {
        const affectedRows = await Item.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Delete item error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
