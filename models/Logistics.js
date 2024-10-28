const db = require('../config/db');

const Logistics = {
    create: async (rental_id, pickup_location, delivery_location, delivery_option, delivery_date) => {
        const query = `
            INSERT INTO logistics (rental_id, pickup_location, delivery_location, delivery_option, delivery_date)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [rental_id, pickup_location, delivery_location, delivery_option, delivery_date]);
        return result;
    }
    ,

    getAll: async () => {
        const query = `SELECT * FROM logistics`;
        const [rows] = await db.execute(query);
        return rows;
    },

    getById: async (id) => {
        const query = `SELECT * FROM logistics WHERE logistics_id = ?`;
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    },

    update: async (id, pickup_location, delivery_location, delivery_option, delivery_date) => {
        const query = `
            UPDATE logistics 
            SET pickup_location = ?, delivery_location = ?, delivery_option = ?, delivery_date = ?
            WHERE logistics_id = ?
        `;
        const [result] = await db.execute(query, [pickup_location, delivery_location, delivery_option, delivery_date, id]);
        return result;
    },

    delete: async (id) => {
        const query = `DELETE FROM logistics WHERE logistics_id = ?`;
        const [result] = await db.execute(query, [id]);
        return result;
    }
};

module.exports = Logistics;
