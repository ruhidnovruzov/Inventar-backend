// routes/adminRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth'); // Kimlik doğrulama middleware-ni import edin
const router = express.Router();

// Bu marşrut `/api/admin` endpointinə GET sorğusu üçün nəzərdə tutulub.
// `protect` middleware-i bu marşruta daxil olmadan əvvəl istifadəçinin tokenini yoxlayacaq.
router.get('/', protect, (req, res) => {
  // Əgər token uğurla doğrulansa, `req.user` obyekti istifadəçi məlumatlarını ehtiva edəcək.
  res.json({ message: `Xoş gəlmisiniz, Admin! Siz daxil oldunuz: ${req.user.username}` });
});

module.exports = router;
