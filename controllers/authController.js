// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // JWT tokenləri ilə işləmək üçün

// JWT token yaratmaq üçün köməkçi funksiya
const generateToken = (id) => {
  // Tokeni istifadəçi ID-si ilə imzalayır, gizli açar və müddət təyin edir
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token 1 saat ərzində etibarlı olacaq
  });
};

// Yeni istifadəçi qeydiyyatı funksiyası
// Qeyd: Bu endpoint adətən yalnız ilkin admin istifadəçisi yaratmaq üçün istifadə edilməlidir.
// Real tətbiqlərdə qeydiyyat prosesi daha mürəkkəb ola bilər (məsələn, admin tərəfindən təsdiq).
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // İstifadəçinin artıq mövcud olub-olmadığını yoxlayın
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Bu istifadəçi adı artıq mövcuddur.' });
    }

    // Yeni istifadəçi yaradın (şifrə User modelində pre-save hook ilə hash ediləcək)
    const user = await User.create({
      username,
      password,
    });

    if (user) {
      // İstifadəçi uğurla yaradılarsa, cavab olaraq istifadəçi məlumatları və token qaytarın
      res.status(201).json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id), // Yeni token yaradılır
      });
    } else {
      res.status(400).json({ message: 'İstifadəçi məlumatları yanlışdır.' });
    }
  } catch (error) {
    // Server xətasını idarə edin
    res.status(500).json({ message: error.message });
  }
};

// İstifadəçi daxilolma funksiyası
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // İstifadəçi adını tapın
    const user = await User.findOne({ username });

    // İstifadəçi mövcuddursa və daxil edilmiş şifrə düzgündürsə
    if (user && (await user.matchPassword(password))) {
      // Uğurlu daxilolma zamanı token qaytarın
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id), // Token yaradılır
      });
    } else {
      // İstifadəçi adı və ya şifrə yanlışdırsa
      res.status(401).json({ message: 'Yanlış istifadəçi adı və ya şifrə.' });
    }
  } catch (error) {
    // Server xətasını idarə edin
    res.status(500).json({ message: error.message });
  }
};
