// models/Printer.js
const mongoose = require('mongoose');

const printerSchema = new mongoose.Schema({
  korpus: { // Printerin yerləşdiyi korpus (bina, otaq, mərtəbə və s.)
    type: String,
    required: true,
    trim: true,
    unique: true // Hər korpusda yalnız bir "printer növü" qeydi olacaq
  },
  say: { // Həmin korpusda neçə ədəd printer var (ümumi say)
    type: Number,
    required: true,
    min: 0
  },
  qeydler: {
    type: String,
    trim: true,
    default: ''
  },
  elaveTarixi: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Printer', printerSchema);