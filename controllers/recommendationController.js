 const Recommendation = require('../models/Recommendation');

 exports.getRecommendationsForUser = async (req, res) => {
    const userId = req.params.id;   
   // console.log("User ID from URL:", userId);

    try {
        const recommendations = await Recommendation.getByUserId(userId);
        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ message: 'Error fetching recommendations', error });
    }
};





 
exports.createRecommendation = async (req, res) => {
    const userId = req.user.userId; 
    const { itemId, recommendationType } = req.body;

    if (!itemId || !recommendationType) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const newRecommendation = new Recommendation(userId, itemId, recommendationType);
        const recommendationId = await Recommendation.create(newRecommendation);
        res.status(201).json({ message: 'Recommendation created', recommendationId });
    } catch (error) {
        console.error('Error creating recommendation:', error);
        res.status(500).json({ message: 'Error creating recommendation', error });
    }
};

 
exports.getRecommendationById = async (req, res) => {
    const { id } = req.params;

    try {
        const recommendation = await Recommendation.getById(id);
        if (!recommendation) {
            return res.status(404).json({ message: 'Recommendation not found' });
        }
        res.status(200).json(recommendation);
    } catch (error) {
        console.error('Error fetching recommendation:', error);
        res.status(500).json({ message: 'Error fetching recommendation', error });
    }
};

 
exports.updateRecommendation = async (req, res) => {
    const { id } = req.params;
    const { itemId, recommendationType } = req.body;

    if (!itemId || !recommendationType) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const updatedRecommendation = { userId: req.user.userId, itemId, recommendationType };
        const affectedRows = await Recommendation.update(id, updatedRecommendation);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Recommendation not found or no changes made' });
        }
        res.status(200).json({ message: 'Recommendation updated' });
    } catch (error) {
        console.error('Error updating recommendation:', error);
        res.status(500).json({ message: 'Error updating recommendation', error });
    }
};

 
exports.deleteRecommendation = async (req, res) => {
    const { id } = req.params;

    try {
        const affectedRows = await Recommendation.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Recommendation not found' });
        }
        res.status(200).json({ message: 'Recommendation deleted' });
    } catch (error) {
        console.error('Error deleting recommendation:', error);
        res.status(500).json({ message: 'Error deleting recommendation', error });
    }
};
