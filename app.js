const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
 
 
const logisticsRoutes = require('./routes/logisticsRoutes');  
const errorHandler = require('./middleware/errorHandler'); 
 
const recommendationRoutes = require('./routes/recommendationRoutes'); 
 
const cors = require('cors');
const db = require('./config/db');  
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);
 
 
 
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
 
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
