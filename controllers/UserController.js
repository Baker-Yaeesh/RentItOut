 
const User = require('../models/User');

class UserController {
     

  
    static async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await User.delete(userId);  
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    }

   
    static async updateUser(req, res) {
        const userId = req.params.id;
        const { name, email, phone_number, address } = req.body;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            await User.update(userId, { name, email, phone_number, address });  
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    }

    
    static async checkUserExists(req, res) {
        const { email } = req.body;
        try {
            const user = await User.findByEmail(email);
            if (user) {
                return res.status(200).json({ message: 'User exists', user });
            }
            res.status(404).json({ message: 'User does not exist' });
        } catch (error) {
            res.status(500).json({ message: 'Error checking user existence', error: error.message });
        }
    }
}

module.exports = UserController;
