const express = require('express');
const logger = require('morgan');
const connectDB = require('./config/db');

const app = express();

// Use Body Parser
app.use(express.json());

// User Logging - Change while deploying
app.use(logger('dev'));

// Connect MongoDB Database
connectDB();

// Use Routes
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost/:${PORT}`
  )
);
