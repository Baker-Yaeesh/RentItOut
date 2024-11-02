 
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

 
exports.register = async (req, res) => {
    const { name, email, password, phone_number, address } = req.body;
    try {
   
        const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

      
        await db.execute(
            'INSERT INTO users (name, email, password, phone_number, address, verification_status) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, hashedPassword, phone_number, address, false]
        );

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });  next(error); 
    }
};

 
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        
        const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

       
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        
        const token = jwt.sign({ userId: user[0].user_id }, process.env.JWT_SECRET, { expiresIn: '12h' });

        return res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });  next(error); 
    }
};

 
exports.verify = async (req, res) => {
    const { userId } = req.body;
    try {
        
        await db.execute('UPDATE users SET verification_status = ? WHERE user_id = ?', [true, userId]);

        return res.status(200).json({ message: 'User verified successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });  next(error); 
    }
};
