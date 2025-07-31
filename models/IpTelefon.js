// models/IpTelefon.js
const mongoose = require('mongoose');

const ipTelefonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false, // Ad boş ola bilər
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Vəzifə daxil edilməlidir.'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Telefon nömrəsi daxil edilməlidir.'],
    unique: true, // Telefon nömrəsi unikal olmalıdır
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('IpTelefon', ipTelefonSchema);
