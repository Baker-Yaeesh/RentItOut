const db = require('../config/db');

const Rental = {
    create: async ({ item_id, user_id, start_date, end_date, total_price }) => {
        const sql = 'INSERT INTO rentals (item_id, user_id, start_date, end_date, total_price) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [item_id, user_id, start_date, end_date, total_price]);
        return result;
    },

    getAll: async () => {
        const sql = 'SELECT * FROM rentals';
        const [rows] = await db.execute(sql);
        return rows;
    },

    getById: async (id) => {
        const sql = 'SELECT * FROM rentals WHERE rental_id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0];  
    },

    update: async (id, { item_id, user_id, start_date, end_date, total_price }) => {
        const sql = 'UPDATE rentals SET item_id = ?, user_id = ?, start_date = ?, end_date = ?, total_price = ? WHERE rental_id = ?';
        const [result] = await db.execute(sql, [item_id, user_id, start_date, end_date, total_price, id]);
        return result;
    },

    delete: async (id) => {
        const sql = 'DELETE FROM rentals WHERE rental_id = ?';
        await db.execute(sql, [id]);
    }
};

module.exports = Rental;
