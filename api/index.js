const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const cors = require('cors');
const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');
const hotelsRoute = require('./routes/hotels.js');
const roomsRoute = require('./routes/rooms.js');

const connect = async () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(console.log('Connected to MongoDB'));
  } catch (err) {
    console.log(err);
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
);

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.listen(process.env.PORT, () => {
  connect();
  console.log('Connected to backend server');
});
