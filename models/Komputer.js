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
  qeydler: {
    type: String,
    required: false, // Qeyd sahəsi artıq tələb olunmur
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Komputer', komputerSchema);