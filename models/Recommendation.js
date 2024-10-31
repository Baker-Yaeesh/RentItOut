 const db = require('../config/db');

class Recommendation {
    constructor(userId, itemId, recommendationType) {
        this.userId = userId;
        this.itemId = itemId;
        this.recommendationType = recommendationType;
        this.createdAt = new Date();
    }

    
    static async create(recommendation) {
        const query = 'INSERT INTO recommendations (user_id, item_id, recommendation_type, created_at) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [recommendation.userId, recommendation.itemId, recommendation.recommendationType, recommendation.createdAt]);
        return result.insertId;
    }

 
    static async getByUserId(userId) {
        const query = 'SELECT * FROM recommendations WHERE user_id = ?';
        const [results] = await db.query(query, [userId]);
        return results;
    }

 
    static async getById(recommendationId) {
        const query = 'SELECT * FROM recommendations WHERE recommendation_id = ?';
        const [results] = await db.query(query, [recommendationId]);
        return results[0];  
    }

   
    static async update(recommendationId, updatedRecommendation) {
        const query = 'UPDATE recommendations SET user_id = ?, item_id = ?, recommendation_type = ? WHERE recommendation_id = ?';
        const [result] = await db.query(query, [updatedRecommendation.userId, updatedRecommendation.itemId, updatedRecommendation.recommendationType, recommendationId]);
        return result.affectedRows;
    }

 
    static async delete(recommendationId) {
        const query = 'DELETE FROM recommendations WHERE recommendation_id = ?';
        const [result] = await db.query(query, [recommendationId]);
        return result.affectedRows;
    }
}

module.exports = Recommendation;
