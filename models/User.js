 

const db = require('../config/db');

class User {
  
    static async findByEmail(email) {
        const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return user[0];
    }
    static async delete(userId) {
        
        await db.execute('DELETE FROM reviews WHERE user_id = ?', [userId]);
        
    
        await db.execute('DELETE FROM items WHERE user_id = ?', [userId]);
        
        
        await db.execute('DELETE FROM rentals WHERE user_id = ?', [userId]);
        
        await db.execute('DELETE FROM revenue WHERE rental_id IN (SELECT rental_id FROM rentals WHERE user_id = ?)', [userId]);
        
       
        await db.execute('DELETE FROM logistics WHERE rental_id IN (SELECT rental_id FROM rentals WHERE user_id = ?)', [userId]);
    
    
        await db.execute('DELETE FROM users WHERE user_id = ?', [userId]);
    }
    
   
     static async update(userId, userData) {
        const { name, email, phone_number, address } = userData;
        await db.execute(
            'UPDATE users SET name = ?, email = ?, phone_number = ?, address = ? WHERE user_id = ?',
            [name, email, phone_number, address, userId]
        );
    }
    
    static async findById(userId) {
        const [user] = await db.execute('SELECT * FROM users WHERE user_id = ?', [userId]);
        return user[0];
    }

    
    static async create(name, email, hashedPassword, phone_number, address) {
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, phone_number, address, verification_status) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, hashedPassword, phone_number, address, false]
        );
        return result.insertId;
    }

   
    static async verifyUser(userId) {
        await db.execute('UPDATE users SET verification_status = ? WHERE user_id = ?', [true, userId]);
    }
}

module.exports = User;
