// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Şifrələri hash etmək üçün

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // İstifadəçi adları unikal olmalıdır
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true // Yaradılma və yenilənmə vaxtlarını avtomatik əlavə edir
});

// Şifrəni bazaya yazmadan əvvəl hash edir (istifadəçi yaradılarkən və ya şifrə dəyişdirilərkən)
userSchema.pre('save', async function (next) {
  // Əgər şifrə sahəsi dəyişdirilməyibsə, hash etmə
  if (!this.isModified('password')) {
    return next();
  }
  // Şifrəni hash etmək üçün salt yaradır (10 dəfə "düyünləmə" gücü)
  const salt = await bcrypt.genSalt(10);
  // Şifrəni hash edir və modeldə saxlayır
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Daxil edilmiş şifrəni bazadakı hash edilmiş şifrə ilə müqayisə edir
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
