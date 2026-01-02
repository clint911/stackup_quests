require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const User = require('./models/UserModel');

const app = express();
const port = process.env.PORT || 3001;

// Security: Rate limiting to prevent DoS attacks
const rateLimit = require('express-rate-limit');

// General rate limiter for all routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

mongoose.connect(process.env.db_connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Security: Protect against qs arrayLimit bypass and memory exhaustion
app.use(express.urlencoded({ 
  extended: true,
  limit: '10mb',              // Limit request body size
  parameterLimit: 1000,       // Limit number of parameters
  depth: 5                    // Limit depth of nested objects (qs option)
}));

app.use(express.json({
  limit: '10mb'               // Also limit JSON body size
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Apply general rate limiter to all routes
app.use(generalLimiter);

// Routes

app.use("/auth", authLimiter, require("./routes/authHandling"));
app.use("/post", require("./routes/postHandling"));
app.use('/', require('./routes/indexHandling'));

const server = app.listen(port, () => {
  console.log("Server listening");
  mongoose.connect(process.env.db_connection).then(() => {
    console.log("Database Connected");
  });
});
