const db = require('../config/db');
exports.create = async (itemData) => {
    const { name, description, category, daily_price, monthly_price, yearly_price, security_deposit, damage_protection, userId } = itemData;
    return await db.execute(
        'INSERT INTO items (name, description, category, daily_price, monthly_price, yearly_price, security_deposit, damage_protection, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, description, category, daily_price, monthly_price, yearly_price, security_deposit, damage_protection, userId]
    );
};
exports.findAll = async () => {
    const [items] = await db.execute('SELECT * FROM items');
    return items;
};
exports.findById = async (id) => {
    const [item] = await db.execute('SELECT * FROM items WHERE item_id = ?', [id]);
    return item.length ? item[0] : null;
};
exports.update = async (id, updatedData) => {
    const { name, description, category, daily_price, monthly_price, yearly_price, security_deposit, damage_protection } = updatedData;
    return await db.execute(
        'UPDATE items SET name = ?, description = ?, category = ?, daily_price = ?, monthly_price = ?, yearly_price = ?, security_deposit = ?, damage_protection = ? WHERE item_id = ?',
        [name, description, category, daily_price, monthly_price, yearly_price, security_deposit, damage_protection, id]
    );
};
exports.delete = async (id) => {
    await db.execute('DELETE FROM reviews WHERE item_id = ?', [id]);
    await db.execute('DELETE FROM revenue WHERE rental_id IN (SELECT rental_id FROM rentals WHERE item_id = ?)', [id]);
    await db.execute('DELETE FROM logistics WHERE rental_id IN (SELECT rental_id FROM rentals WHERE item_id = ?)', [id]);
    await db.execute('DELETE FROM rentals WHERE item_id = ?', [id]);
    const [result] = await db.execute('DELETE FROM items WHERE item_id = ?', [id]);
    return result.affectedRows;
};
