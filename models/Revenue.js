 
const db = require('../config/db');

 
const Revenue = {
    create: (data, callback) => {
        const { rental_id, platform_fee, insurance_fee, total_income } = data;
        db.query(
            'INSERT INTO revenue (rental_id, platform_fee, insurance_fee, total_income) VALUES (?, ?, ?, ?)',
            [rental_id, platform_fee, insurance_fee, total_income],
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results.insertId);   
            }
        );
    },

    getAll: (callback) => {
        db.query('SELECT * FROM revenue', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM revenue WHERE revenue_id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length === 0) {
                return callback(new Error('Revenue record not found'), null);
            }
            callback(null, results[0]);
        });
    },
  
    update: (id, data, callback) => {
        const { platform_fee, insurance_fee, total_income } = data;
        db.query(
            'UPDATE revenue SET platform_fee = ?, insurance_fee = ?, total_income = ? WHERE revenue_id = ?',
            [platform_fee, insurance_fee, total_income, id],
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                if (results.affectedRows === 0) {
                    return callback(new Error('Revenue record not found'), null);
                }
                callback(null, results);
            }
        );
    },
    delete: (id, callback) => {
        db.query('DELETE FROM revenue WHERE revenue_id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.affectedRows === 0) {
                return callback(new Error('Revenue record not found'), null);
            }
            callback(null, results);
        });
    },
};

module.exports = Revenue;
