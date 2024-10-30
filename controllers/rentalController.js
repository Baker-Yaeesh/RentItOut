  
const Rental = require('../models/Rental');

 
const calculateTotalPrice = (start_date, end_date) => {
    const start = new Date(start_date);
    const end = new Date(end_date);
    const duration = (end - start) / (1000 * 60 * 60 * 24);  
    const pricePerDay = 10;  
    return duration * pricePerDay;
};

 
exports.createRental = async (req, res) => {
    try {
        const { item_id, user_id, start_date, end_date } = req.body;

        
        if (!item_id || !user_id || !start_date || !end_date) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

      
        const total_price = calculateTotalPrice(start_date, end_date);

        const result = await Rental.create({ item_id, user_id, start_date, end_date, total_price });
        res.status(201).json({ message: 'Rental created successfully', rentalId: result.insertId });
    } catch (error) {
        console.error("Create rental error:", error);
        res.status(500).json({ message: 'Unable to create rental', error: error.message });
        next(error); }
};

 
exports.getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.getAll();
        res.status(200).json(rentals);
    } catch (error) {
        console.error("Get rentals error:", error);
        res.status(500).json({ message: 'Unable to retrieve rentals', error: error.message });
        next(error); }
};

 
exports.getRentalById = async (req, res) => {
    const rentalId = req.params.id;

    try {
        const rental = await Rental.getById(rentalId);
        if (rental) {
            res.status(200).json(rental);
        } else {
            res.status(404).json({ message: 'Rental not found.' });
        }
    } catch (error) {
        console.error("Get rental error:", error);
        res.status(500).json({ message: 'Unable to retrieve rental', error: error.message });
        next(error); }
};

 
exports.updateRental = async (req, res) => {
    const rentalId = req.params.id;
    const { item_id, user_id, start_date, end_date, total_price } = req.body;

    try {
        const updatedRental = await Rental.update(rentalId, { item_id, user_id, start_date, end_date, total_price });
        res.status(200).json({ message: 'Rental updated successfully', rental: updatedRental });
    } catch (error) {
        console.error("Update rental error:", error);
        res.status(500).json({ message: 'Unable to update rental', error: error.message });
        next(error); }
};

 
exports.deleteRental = async (req, res) => {
    const rentalId = req.params.id;

    try {
        await Rental.delete(rentalId);
        res.status(200).json({ message: 'Rental deleted successfully' });
    } catch (error) {
        console.error("Delete rental error:", error);
        res.status(500).json({ message: 'Unable to delete rental', error: error.message });
        next(error); }
};
