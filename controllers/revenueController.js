  
const db = require('../config/db');

 
exports.getAllRevenue = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM revenue');
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching revenue:', error);
        res.status(500).json({ message: 'Error fetching revenue', error });
    }
};

 
exports.getRevenueById = async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await db.query('SELECT * FROM revenue WHERE revenue_id = ?', [id]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Revenue not found' });
        }

        res.status(200).json(results[0]);
    } catch (error) {
        console.error('Error fetching revenue:', error);
        res.status(500).json({ message: 'Error fetching revenue', error });
    }
};

 
exports.createRevenue = async (req, res) => {
    const { rental_id, platform_fee, insurance_fee, total_income } = req.body;

    if (!rental_id || !platform_fee || !total_income) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const query = 'INSERT INTO revenue (rental_id, platform_fee, insurance_fee, total_income) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [rental_id, platform_fee, insurance_fee, total_income]);

        res.status(201).json({ message: 'Revenue entry created', revenue_id: result.insertId });
    } catch (error) {
        console.error('Error creating revenue:', error);
        res.status(500).json({ message: 'Error creating revenue', error });
    }
};

 
exports.updateRevenue = async (req, res) => {
    const { id } = req.params;
    const { rental_id, platform_fee, insurance_fee, total_income } = req.body;

    try {
        const query = 'UPDATE revenue SET rental_id = ?, platform_fee = ?, insurance_fee = ?, total_income = ? WHERE revenue_id = ?';
        const [result] = await db.query(query, [rental_id, platform_fee, insurance_fee, total_income, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Revenue not found or no changes made' });
        }

        res.status(200).json({ message: 'Revenue entry updated' });
    } catch (error) {
        console.error('Error updating revenue:', error);
        res.status(500).json({ message: 'Error updating revenue', error });
    }
};

 
exports.deleteRevenue = async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM revenue WHERE revenue_id = ?';
        const [result] = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Revenue not found' });
        }

        res.status(200).json({ message: 'Revenue entry deleted' });
    } catch (error) {
        console.error('Error deleting revenue:', error);
        res.status(500).json({ message: 'Error deleting revenue', error });
    }
};
