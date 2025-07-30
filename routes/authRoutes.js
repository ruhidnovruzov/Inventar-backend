// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Yeni istifadəçi qeydiyyatı üçün POST marşrutu
router.post('/register', registerUser);

// İstifadəçi daxilolması üçün POST marşrutu
router.post('/login', loginUser);

module.exports = router;
