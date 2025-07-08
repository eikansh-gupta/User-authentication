require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'your_session_secret', 
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
console.log('paymentRoutes:', paymentRoutes);

console.log('authRoutes:', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
