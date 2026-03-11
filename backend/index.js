const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const ringRoutes = require('./routes/rings');
const coupleRoutes = require('./routes/couples');
const orderRoutes = require('./routes/orders');

app.use('/api/auth', authRoutes);
app.use('/api/rings', ringRoutes);
app.use('/api/couples', coupleRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});