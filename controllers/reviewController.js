 const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    const { user_id, item_id, rating, review } = req.body;

    try {
        const newReview = await Review.create(user_id, item_id, rating, review);
        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error creating review: ", error);
        res.status(500).json({ message: "Unable to create review" });  next(error); 
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.getAll();
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews: ", error);
        res.status(500).json({ message: "Unable to fetch reviews" });  next(error); 
    }
};

exports.getReviewsByItemId = async (req, res) => {
    const { itemId } = req.params;

    try {
        const reviews = await Review.getByItemId(itemId);
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews for item: ", error);
        res.status(500).json({ message: "Unable to fetch reviews for item" });  next(error); 
    }
};

exports.getReviewsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const reviews = await Review.getByUserId(userId);
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews for user: ", error);
        res.status(500).json({ message: "Unable to fetch reviews for user" });  next(error); 
    }
};

exports.updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, review } = req.body;

    try {
        const updatedReview = await Review.update(reviewId, rating, review);
        res.status(200).json(updatedReview);
    } catch (error) {
        console.error("Error updating review: ", error);
        res.status(500).json({ message: "Unable to update review" });  next(error); 
    }
};

exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        await Review.delete(reviewId);
        res.status(204).send(); 
    } catch (error) {
        console.error("Error deleting review: ", error);
        res.status(500).json({ message: "Unable to delete review" });  next(error); 
    }
};
