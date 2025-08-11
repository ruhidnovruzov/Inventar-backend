// models/Komputer.js
const mongoose = require('mongoose');

const komputerSchema = new mongoose.Schema({
  korpus: {
    type: String,
    required: [true, 'Korpus daxil edilməlidir.'],
    trim: true
  },
  say: {
    type: Number,
    required: [true, 'Say daxil edilməlidir.'],
    min: [0, 'Say mənfi ola bilməz.']
  },
  kategoriya: { // Yeni: Kompüterin kateqoriyası
    type: String,
    required: [true, 'Kateqoriya daxil edilməlidir.'],
    enum: ['Auditoriya', 'İnzibati', 'Akademik', 'Laboratoriya', 'Digər'], // Yalnız bu dəyərlərə icazə verilir
    default: 'Auditoriya' // Default dəyər təyin edə bilərsiniz
  },
  qeydler: {
    type: String,
    required: false,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Komputer', komputerSchema);