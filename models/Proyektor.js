// models/Proyektor.js
const mongoose = require('mongoose');

const proyektorSchema = new mongoose.Schema({
  korpus: { // Proyektorun yerləşdiyi korpus (bina, otaq, mərtəbə və s.)
    type: String,
    required: true,
    trim: true,
    unique: true // Hər korpusda yalnız bir "proyektor növü" qeydi olacaq
  },
  say: { // Həmin korpusda neçə ədəd proyektor var (ümumi say)
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

module.exports = mongoose.model('Proyektor', proyektorSchema);