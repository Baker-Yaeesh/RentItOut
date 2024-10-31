const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const reviewRoutes = require('./routes/reviewRoutes');  
const logisticsRoutes = require('./routes/logisticsRoutes');  
const errorHandler = require('./middleware/errorHandler'); 
const revenueRoutes = require('./routes/revenueRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes'); 
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const db = require('./config/db');  
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);
 
app.use('/api', userRoutes);
app.use('/api/revenue', revenueRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/reviews', reviewRoutes); 
app.use('/api/logistics', logisticsRoutes); 
app.use('/api/recommendations', recommendationRoutes); 

 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
