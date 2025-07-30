// middleware/auth.js
const jwt = require('jsonwebtoken'); // JWT tokenləri ilə işləmək üçün
const User = require('../models/User'); // İstifadəçi modelini import edin

const protect = async (req, res, next) => {
  let token;

  // Header-də "Authorization" sahəsinin olub-olmadığını və "Bearer" ilə başladığını yoxlayın
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Tokeni "Bearer" sözündən sonra alın (məsələn: "Bearer YOUR_TOKEN_HERE")
      token = req.headers.authorization.split(' ')[1];

      // Tokeni gizli açarımızla doğrulayın
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tokendən alınan ID ilə istifadəçini tapın və şifrəni cavabdan çıxarın
      req.user = await User.findById(decoded.id).select('-password');

      // Növbəti middleware-ə və ya route handler-ə keçin
      next();
    } catch (error) {
      // Token doğrulama zamanı xəta baş verərsə
      console.error('Token doğrulama xətası:', error);
      res.status(401).json({ message: 'Token etibarsızdır və ya müddəti bitmişdir.' });
    }
  }

  // Əgər token tapılmasa
  if (!token) {
    res.status(401).json({ message: 'Daxil olmaq üçün token tapılmadı.' });
  }
};

module.exports = { protect };
