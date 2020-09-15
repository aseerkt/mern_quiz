const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const app = express();

// Passport config

// Use Body Parser
app.use(express.json());

// Use CookieParser
app.use(cookieParser());

// User Logging - Change while deploying
app.use(logger('dev'));

// Use helmet
app.use(helmet());

// Use CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// Connect MongoDB Database
connectDB();

// Use Routes
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost/:${PORT}`
  )
);
