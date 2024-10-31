 
const db = require('../config/db');

class Review {
    static async create(user_id, item_id, rating, review) {
        const [result] = await db.query(
            'INSERT INTO reviews (user_id, item_id, rating, review) VALUES (?, ?, ?, ?)',
            [user_id, item_id, rating, review]
        );
        return { id: result.insertId, user_id, item_id, rating, review };
    }

    static async getAll() {
        const [rows] = await db.query('SELECT * FROM reviews');
        return rows;
    }

    static async getByItemId(item_id) {
        const [rows] = await db.query('SELECT * FROM reviews WHERE item_id = ?', [item_id]);
        return rows;
    }

    static async getByUserId(user_id) {
        const [rows] = await db.query('SELECT * FROM reviews WHERE user_id = ?', [user_id]);
        return rows;
    }

    static async update(review_id, rating, review) {
        await db.query('UPDATE reviews SET rating = ?, review = ? WHERE review_id = ?', [rating, review, review_id]);
        return { review_id, rating, review };
    }

    static async delete(review_id) {
        await db.query('DELETE FROM reviews WHERE review_id = ?', [review_id]);
    }
}

module.exports = Review;
